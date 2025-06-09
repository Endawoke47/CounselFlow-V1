
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useState } from "react";

export function RiskVisualization() {
  const [filterEntity, setFilterEntity] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // Risk heat map data (Impact vs Likelihood)
  const heatMapData = [
    { x: 1, y: 4, name: "GDPR Compliance Gap", severity: "Critical", category: "Compliance" },
    { x: 2, y: 4, name: "Contract Termination", severity: "High", category: "Contractual" },
    { x: 4, y: 3, name: "Patent Opposition", severity: "High", category: "IP" },
    { x: 1, y: 5, name: "Class Action Risk", severity: "Medium", category: "Litigation" },
    { x: 3, y: 2, name: "Vendor Risk", severity: "Medium", category: "Outsourcing" },
    { x: 2, y: 2, name: "Regulatory Change", severity: "Low", category: "Regulatory" },
    { x: 1, y: 1, name: "Minor IP Issue", severity: "Low", category: "IP" },
    { x: 5, y: 1, name: "Reputation Risk", severity: "Medium", category: "Reputation" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "#dc2626";
      case "High": return "#ea580c";
      case "Medium": return "#d97706";
      case "Low": return "#65a30d";
      default: return "#6b7280";
    }
  };

  const riskMatrix = [
    [
      { impact: 1, likelihood: 1, count: 2, risks: ["Minor IP Issue", "Low vendor risk"] },
      { impact: 1, likelihood: 2, count: 1, risks: ["Regulatory change impact"] },
      { impact: 1, likelihood: 3, count: 0, risks: [] },
      { impact: 1, likelihood: 4, count: 1, risks: ["GDPR audit finding"] },
      { impact: 1, likelihood: 5, count: 1, risks: ["Class action exposure"] }
    ],
    [
      { impact: 2, likelihood: 1, count: 0, risks: [] },
      { impact: 2, likelihood: 2, count: 1, risks: ["Vendor performance"] },
      { impact: 2, likelihood: 3, count: 0, risks: [] },
      { impact: 2, likelihood: 4, count: 1, risks: ["Contract termination"] },
      { impact: 2, likelihood: 5, count: 0, risks: [] }
    ],
    [
      { impact: 3, likelihood: 1, count: 0, risks: [] },
      { impact: 3, likelihood: 2, count: 0, risks: [] },
      { impact: 3, likelihood: 3, count: 0, risks: [] },
      { impact: 3, likelihood: 4, count: 0, risks: [] },
      { impact: 3, likelihood: 5, count: 0, risks: [] }
    ],
    [
      { impact: 4, likelihood: 1, count: 0, risks: [] },
      { impact: 4, likelihood: 2, count: 0, risks: [] },
      { impact: 4, likelihood: 3, count: 1, risks: ["Patent opposition"] },
      { impact: 4, likelihood: 4, count: 0, risks: [] },
      { impact: 4, likelihood: 5, count: 0, risks: [] }
    ],
    [
      { impact: 5, likelihood: 1, count: 1, risks: ["Reputation damage"] },
      { impact: 5, likelihood: 2, count: 0, risks: [] },
      { impact: 5, likelihood: 3, count: 0, risks: [] },
      { impact: 5, likelihood: 4, count: 0, risks: [] },
      { impact: 5, likelihood: 5, count: 0, risks: [] }
    ]
  ];

  const getMatrixCellColor = (count: number) => {
    if (count === 0) return "bg-gray-50";
    if (count <= 1) return "bg-green-100";
    if (count <= 2) return "bg-yellow-100";
    if (count <= 3) return "bg-orange-100";
    return "bg-red-100";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Risk Analysis & Visualization</h2>
          <p className="text-muted-foreground">Interactive risk assessment and heat maps</p>
        </div>
        <div className="flex gap-4">
          <Select value={filterEntity} onValueChange={setFilterEntity}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Entity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Entities</SelectItem>
              <SelectItem value="global">Global Holdings</SelectItem>
              <SelectItem value="eu">EU Operations</SelectItem>
              <SelectItem value="apac">APAC Subsidiary</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Contractual">Contractual</SelectItem>
              <SelectItem value="Compliance">Compliance</SelectItem>
              <SelectItem value="IP">IP & Licensing</SelectItem>
              <SelectItem value="Litigation">Litigation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Scatter Plot */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Impact vs Likelihood</CardTitle>
            <CardDescription>Interactive scatter plot showing risk positioning</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Likelihood" 
                  domain={[0, 6]}
                  tickCount={6}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Impact" 
                  domain={[0, 6]}
                  tickCount={6}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border rounded shadow">
                          <p className="font-medium">{data.name}</p>
                          <p className="text-sm">Category: {data.category}</p>
                          <p className="text-sm">Severity: {data.severity}</p>
                          <p className="text-sm">Likelihood: {data.x}</p>
                          <p className="text-sm">Impact: {data.y}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter data={heatMapData}>
                  {heatMapData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getSeverityColor(entry.severity)} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Heat Map Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Heat Map Matrix</CardTitle>
            <CardDescription>Grid view of risks by impact and likelihood</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground mb-4">
                <span>← Lower Impact</span>
                <span>Higher Impact →</span>
              </div>
              <div className="grid grid-cols-6 gap-1">
                <div></div>
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="text-center text-xs font-medium p-2">
                    L{i}
                  </div>
                ))}
                {riskMatrix.map((row, rowIndex) => (
                  <>
                    <div key={`impact-${rowIndex}`} className="text-center text-xs font-medium p-2">
                      I{5 - rowIndex}
                    </div>
                    {row.map((cell, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`${getMatrixCellColor(cell.count)} border p-2 h-16 flex items-center justify-center text-xs font-medium cursor-pointer hover:opacity-80`}
                        title={cell.risks.join(', ')}
                      >
                        {cell.count > 0 && cell.count}
                      </div>
                    ))}
                  </>
                ))}
              </div>
              <div className="flex justify-center text-sm text-muted-foreground mt-4">
                <span>↑ Higher Likelihood</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">Critical Risks</p>
            <div className="w-full bg-red-100 rounded-full h-2 mt-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">5</div>
            <p className="text-xs text-muted-foreground">High Risks</p>
            <div className="w-full bg-orange-100 rounded-full h-2 mt-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{ width: '42%' }}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">4</div>
            <p className="text-xs text-muted-foreground">Medium Risks</p>
            <div className="w-full bg-yellow-100 rounded-full h-2 mt-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '33%' }}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">2</div>
            <p className="text-xs text-muted-foreground">Low Risks</p>
            <div className="w-full bg-green-100 rounded-full h-2 mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '17%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
