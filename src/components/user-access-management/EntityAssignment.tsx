
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Globe, Building, MapPin } from "lucide-react";

const mockEntityAssignments = [
  {
    id: "1",
    user: "Sarah Johnson",
    role: "Legal Officer",
    entities: ["Company Inc.", "Subsidiary A"],
    regions: ["North America"],
    restrictions: "Contract approval limit: $100K"
  },
  {
    id: "2",
    user: "Michael Chen",
    role: "General Counsel",
    entities: ["All Entities"],
    regions: ["Global"],
    restrictions: "No restrictions"
  },
  {
    id: "3",
    user: "Emily Rodriguez",
    role: "Compliance Manager",
    entities: ["Company Inc.", "European Holdings"],
    regions: ["North America", "Europe"],
    restrictions: "Compliance matters only"
  },
  {
    id: "4",
    user: "David Kim",
    role: "External Counsel",
    entities: ["Limited - Matter specific"],
    regions: ["Asia Pacific"],
    restrictions: "Dispute #2024-001 only, expires 2024-03-01"
  }
];

export function EntityAssignment() {
  return (
    <div className="space-y-6">
      <Card className="modern-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Globe className="h-4 w-4 text-primary" />
            </div>
            Entity & Geography Access
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed">
            Manage user access to specific entities, regions, and business units
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden rounded-lg border border-border/50">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="font-semibold text-foreground">User</TableHead>
                  <TableHead className="font-semibold text-foreground">Role</TableHead>
                  <TableHead className="font-semibold text-foreground">Entity Access</TableHead>
                  <TableHead className="font-semibold text-foreground">Regional Scope</TableHead>
                  <TableHead className="font-semibold text-foreground">Access Restrictions</TableHead>
                  <TableHead className="font-semibold text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEntityAssignments.map((assignment) => (
                  <TableRow key={assignment.id} className="hover:bg-accent/30 transition-colors">
                    <TableCell className="py-4">
                      <div className="font-medium text-foreground">{assignment.user}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className="rounded-lg border-border/50 bg-muted/30">
                        {assignment.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {assignment.entities.map((entity, index) => (
                          <Badge key={index} variant="secondary" className="text-xs rounded-lg bg-accent/50 border border-border/30">
                            <Building className="h-3 w-3 mr-1.5" />
                            {entity}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {assignment.regions.map((region, index) => (
                          <Badge key={index} variant="outline" className="text-xs rounded-lg border-border/50">
                            <MapPin className="h-3 w-3 mr-1.5" />
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs py-4">
                      <div className="text-sm text-muted-foreground">{assignment.restrictions}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Button variant="outline" size="sm" className="h-8 rounded-lg border-border/50 hover:bg-accent/50">
                        Edit Access
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
