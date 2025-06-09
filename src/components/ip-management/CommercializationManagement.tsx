
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, TrendingUp, FileText, Plus, Eye } from "lucide-react";

const mockLicenses = [
  {
    id: "1",
    asset: "AI Processing Method",
    licensee: "MegaCorp Inc",
    type: "Outbound",
    territory: "North America",
    exclusivity: "Non-exclusive",
    term: "5 years",
    royaltyRate: "3.5%",
    annualRevenue: "$125,000",
    status: "Active"
  },
  {
    id: "2",
    asset: "DataFlow Technology",
    licensor: "InnovateTech Ltd",
    type: "Inbound",
    territory: "Global",
    exclusivity: "Exclusive",
    term: "3 years",
    royaltyRate: "2.0%",
    annualCost: "$85,000",
    status: "Active"
  }
];

const commercializationMetrics = [
  { label: "Total License Revenue", value: "$2.4M", change: "+12%", period: "YTD" },
  { label: "Active Licenses", value: "47", change: "+3", period: "This Quarter" },
  { label: "License Portfolio Value", value: "$15.8M", change: "+8%", period: "Estimated" },
  { label: "Average Royalty Rate", value: "2.8%", change: "+0.2%", period: "Weighted" }
];

export function CommercializationManagement() {
  const [showAddModal, setShowAddModal] = useState(false);

  const getTypeBadge = (type: string) => {
    return type === "Outbound" 
      ? <Badge className="bg-green-100 text-green-800">Outbound</Badge>
      : <Badge className="bg-blue-100 text-blue-800">Inbound</Badge>;
  };

  const getExclusivityBadge = (exclusivity: string) => {
    return exclusivity === "Exclusive"
      ? <Badge className="bg-purple-100 text-purple-800">Exclusive</Badge>
      : <Badge variant="outline">Non-exclusive</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">IP Commercialization</h2>
          <p className="text-muted-foreground">
            Manage licensing agreements and track revenue generation
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add License Agreement
        </Button>
      </div>

      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {commercializationMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                  <div className="text-xs text-muted-foreground">{metric.period}</div>
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* License Agreements Table */}
      <Card>
        <CardHeader>
          <CardTitle>License Agreements</CardTitle>
          <CardDescription>Active licensing agreements and revenue streams</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>IP Asset</TableHead>
                <TableHead>Partner</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Territory</TableHead>
                <TableHead>Exclusivity</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Royalty Rate</TableHead>
                <TableHead>Annual Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLicenses.map((license) => (
                <TableRow key={license.id}>
                  <TableCell className="font-medium">{license.asset}</TableCell>
                  <TableCell>
                    {license.type === "Outbound" ? license.licensee : license.licensor}
                  </TableCell>
                  <TableCell>{getTypeBadge(license.type)}</TableCell>
                  <TableCell>{license.territory}</TableCell>
                  <TableCell>{getExclusivityBadge(license.exclusivity)}</TableCell>
                  <TableCell>{license.term}</TableCell>
                  <TableCell>{license.royaltyRate}</TableCell>
                  <TableCell className="font-medium">
                    {license.type === "Outbound" ? license.annualRevenue : license.annualCost}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">{license.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Revenue Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Asset Type</CardTitle>
            <CardDescription>Licensing revenue breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Patents</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <span className="text-sm font-medium">$1.56M (65%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Trademarks</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                </div>
                <span className="text-sm font-medium">$0.6M (25%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Copyrights</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                </div>
                <span className="text-sm font-medium">$0.24M (10%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geographic Revenue</CardTitle>
            <CardDescription>Revenue distribution by region</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">North America</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
                <span className="text-sm font-medium">$1.08M (45%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Europe</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                </div>
                <span className="text-sm font-medium">$0.84M (35%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Asia Pacific</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                </div>
                <span className="text-sm font-medium">$0.48M (20%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Licensing Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Licensing Opportunities</CardTitle>
          <CardDescription>Underutilized assets with commercialization potential</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <div className="font-medium">Machine Learning Framework</div>
                <div className="text-sm text-muted-foreground">
                  Granted patent with high commercial interest - 3 licensing inquiries pending
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">High Potential</Badge>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <div className="font-medium">CloudSync Technology</div>
                <div className="text-sm text-muted-foreground">
                  Active patent family in 12 jurisdictions - suitable for licensing program
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Medium Potential</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
