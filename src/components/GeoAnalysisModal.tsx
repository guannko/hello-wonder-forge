import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useGeoAnalyze } from "@/hooks/useGeoAnalyze";
import { Loader2, TrendingUp, AlertCircle } from "lucide-react";

interface GeoAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GeoAnalysisModal = ({ open, onOpenChange }: GeoAnalysisModalProps) => {
  const [brandName, setBrandName] = useState("");
  const [analyzedBrand, setAnalyzedBrand] = useState("");
  const analyzeMutation = useGeoAnalyze();

  const handleAnalyze = async () => {
    if (!brandName.trim()) return;
    
    try {
      setAnalyzedBrand(brandName.trim());
      await analyzeMutation.mutateAsync({ brandName: brandName.trim() });
    } catch (error) {
      console.error("Analysis failed:", error);
    }
  };

  const results = analyzeMutation.data;
  const hasResults = results && Object.keys(results).length > 0;
  const errorMessage = analyzeMutation.error 
    ? (analyzeMutation.error as Error).message 
    : "Analysis failed. Please try again.";

  const aiProviders = [
    { name: "ChatGPT", key: "chatgpt" as const },
    { name: "DeepSeek", key: "deepseek" as const },
    { name: "Mistral", key: "mistral" as const },
  ];

  const averageScore = hasResults
    ? Math.round(
        Object.values(results).reduce((sum, score) => sum + score, 0) /
          Object.keys(results).length
      )
    : 0;

  const getScoreColor = (score: number) => {
    if (score >= 15) return "hsl(142, 76%, 36%)"; // Green
    if (score >= 10) return "hsl(45, 93%, 47%)"; // Yellow/Orange
    return "hsl(0, 84%, 60%)"; // Red
  };

  const getScoreLevel = (score: number) => {
    if (score >= 15) return "Хорошо";
    if (score >= 10) return "Средне";
    return "Плохо";
  };

  const problemsCount = hasResults
    ? Object.values(results).filter(score => score < 15).length
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Анализ видимости бренда в AI</DialogTitle>
          <DialogDescription>
            Проанализируйте, как AI-системы воспринимают ваш бренд
          </DialogDescription>
        </DialogHeader>

        {!hasResults && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Название бренда</label>
              <Input
                placeholder="Введите название бренда..."
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                disabled={analyzeMutation.isPending}
              />
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={!brandName.trim() || analyzeMutation.isPending}
              className="w-full"
              size="lg"
            >
              {analyzeMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Анализ в 5 AI-системах...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Анализировать бренд
                </>
              )}
            </Button>

            {analyzeMutation.isError && (
              <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-destructive">Ошибка анализа</p>
                  <p className="text-xs text-destructive/80 mt-1">{errorMessage}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Проверьте консоль браузера для деталей
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {hasResults && (
          <div className="space-y-6 py-4">
            <div className="text-center space-y-2">
              <div className="text-lg font-semibold text-muted-foreground">
                Результаты анализа для
              </div>
              <div className="text-3xl font-bold text-foreground">{analyzedBrand}</div>
              <div className="text-5xl font-bold text-primary mt-2">{averageScore}/20</div>
              <p className="text-sm text-muted-foreground">Средний балл видимости в AI</p>
            </div>

            {problemsCount > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-destructive">
                      Обнаружено {problemsCount} {problemsCount === 1 ? 'критическая проблема' : 'критические проблемы'} видимости
                    </p>
                    <p className="text-xs text-destructive/80 mt-1">
                      Ваш бренд плохо представлен в {problemsCount} крупн{problemsCount === 1 ? 'ой AI-системе' : 'ых AI-системах'}. 
                      Вы теряете потенциальных клиентов в пользу конкурентов.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {aiProviders.map((provider) => {
                const score = results[provider.key] ?? 0;
                const percentage = (score / 20) * 100;
                const scoreColor = getScoreColor(score);
                const scoreLevel = getScoreLevel(score);

                return (
                  <div key={provider.key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{provider.name}</span>
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-xs font-medium px-2 py-0.5 rounded"
                          style={{ 
                            backgroundColor: `${scoreColor}20`,
                            color: scoreColor 
                          }}
                        >
                          {scoreLevel}
                        </span>
                        <span className="text-sm font-bold">{score}/20</span>
                      </div>
                    </div>
                    <Progress 
                      value={percentage} 
                      className="h-2"
                      style={{
                        ['--progress-background' as string]: scoreColor
                      } as React.CSSProperties}
                    />
                  </div>
                );
              })}
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">⚠️ Ограничение бесплатного анализа</p>
              <p className="text-xs text-muted-foreground">
                Эта быстрая проверка выявляет только поверхностные проблемы видимости. 
                Вы видите проблему, но не решение.
                Получите полный отчёт, чтобы узнать, как именно исправить эти проблемы и доминировать в AI-поиске.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  analyzeMutation.reset();
                  setBrandName("");
                  setAnalyzedBrand("");
                }}
                variant="outline"
                className="flex-1"
              >
                Анализировать ещё
              </Button>
              <Button className="flex-1">Получить полный анализ →</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GeoAnalysisModal;
