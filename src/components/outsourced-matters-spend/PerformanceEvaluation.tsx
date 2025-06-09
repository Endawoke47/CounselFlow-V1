
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, TrendingUp, Award, Users } from "lucide-react";

export function PerformanceEvaluation() {
  const vendorRankings = [
    {
      name: "Davis Polk & Wardwell",
      overallScore: 4.8,
      responsiveness: 4.9,
      expertise: 4.8,
      commerciality: 4.7,
      billingIntegrity: 4.8,
      engagements: 8,
      tier: "A"
    },
    {
      name: "Clifford Chance",
      overallScore: 4.6,
      responsiveness: 4.5,
      expertise: 4.8,
      commerciality: 4.6,
      billingIntegrity: 4.5,
      engagements: 12,
      tier: "A"
    },
    {
      name: "Baker McKenzie",
      overallScore: 4.5,
      responsiveness: 4.4,
      expertise: 4.6,
      commerciality: 4.5,
      billingIntegrity: 4.4,
      engagements: 15,
      tier: "B"
    },
    {
      name: "Allen & Overy",
      overallScore: 4.7,
      responsiveness: 4.8,
      expertise: 4.7,
      commerciality: 4.6,
      billingIntegrity: 4.7,
      engagements: 6,
      tier: "A"
    }
  ];

  const performanceMetrics = [
    { category: "Responsiveness", description: "Speed of initial response and ongoing communication" },
    { category: "Expertise", description: "Technical knowledge and quality of legal advice" },
    { category: "Commerciality", description: "Business-oriented approach and practical solutions" },
    { category: "Billing Integrity", description: "Transparency and accuracy in billing practices" }
  ];

  const recentFeedback = [
    {
      vendor: "Davis Polk & Wardwell",
      matter: "M&A - TechCorp Acquisition",
      rating: 5,
      feedback: "Excellent work on the acquisition. Team was highly responsive and provided practical commercial advice throughout the process.",
      reviewer: "Sarah Chen, Legal Director",
      date: "2024-03-15"
    },
    {
      vendor: "Clifford Chance",
      matter: "Banking Regulatory Review",
      rating: 4,
      feedback: "Strong technical expertise but could improve on project management and timelines.",
      reviewer: "Michael Torres, Senior Counsel",
      date: "2024-03-10"
    },
    {
      vendor: "Baker McKenzie",
      matter: "Employment Policy Update",
      rating: 4,
      feedback: "Good understanding of local employment laws. Delivered comprehensive policy framework on time.",
      reviewer: "Emma Watson, HR Legal Lead",
      date: "2024-03-08"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Performance Evaluation & Vendor Ranking</h2>
          <p className="text-muted-foreground">Assess vendor performance and maintain preferred panels</p>
        </div>
        <Button>
          <Award className="h-4 w-4 mr-2" />
          Add Evaluation
        </Button>
      </div>

      {/* Performance Metrics Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Criteria used for vendor evaluation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <h4 className="font-medium">{metric.category}</h4>
                <p className="text-sm text-muted-foreground mt-1">{metric.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vendor Rankings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Vendor Performance Rankings
          </CardTitle>
          <CardDescription>Based on historical performance and recent feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vendorRankings.map((vendor, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-muted-foreground">#{index + 1}</div>
                    <div>
                      <h4 className="font-medium">{vendor.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{vendor.overallScore}</span>
                        </div>
                        <Badge 
                          variant={vendor.tier === "A" ? "default" : vendor.tier === "B" ? "secondary" : "outline"}
                        >
                          Tier {vendor.tier}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{vendor.engagements} engagements</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Responsiveness</div>
                    <div className="flex items-center gap-2">
                      <Progress value={vendor.responsiveness * 20} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{vendor.responsiveness}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Expertise</div>
                    <div className="flex items-center gap-2">
                      <Progress value={vendor.expertise * 20} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{vendor.expertise}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Commerciality</div>
                    <div className="flex items-center gap-2">
                      <Progress value={vendor.commerciality * 20} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{vendor.commerciality}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Billing Integrity</div>
                    <div className="flex items-center gap-2">
                      <Progress value={vendor.billingIntegrity * 20} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{vendor.billingIntegrity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Performance Feedback</CardTitle>
          <CardDescription>Latest evaluations from matter owners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentFeedback.map((feedback, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{feedback.vendor}</h4>
                    <p className="text-sm text-muted-foreground">{feedback.matter}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm mb-2">{feedback.feedback}</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{feedback.reviewer}</span>
                  <span>{feedback.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
