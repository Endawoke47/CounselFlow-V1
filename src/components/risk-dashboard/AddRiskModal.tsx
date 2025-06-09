
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddRiskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddRiskModal({ open, onOpenChange }: AddRiskModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [likelihood, setLikelihood] = useState("");
  const [impact, setImpact] = useState("");
  const [entity, setEntity] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding risk:", { 
      title, category, severity, likelihood, impact, entity, jurisdiction, owner, description, source 
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Risk</DialogTitle>
          <DialogDescription>
            Register a new risk for tracking and mitigation
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Risk Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter risk title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contractual">Contractual</SelectItem>
                  <SelectItem value="litigation">Litigation & Disputes</SelectItem>
                  <SelectItem value="governance">Governance & Company Secretarial</SelectItem>
                  <SelectItem value="ip">IP & Licensing</SelectItem>
                  <SelectItem value="outsourcing">Outsourcing / Third Parties</SelectItem>
                  <SelectItem value="compliance">Compliance & Regulatory</SelectItem>
                  <SelectItem value="reputation">Reputation / ESG</SelectItem>
                  <SelectItem value="privacy">Data Privacy / Cyber</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="source">Source *</Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contract">Contract Review</SelectItem>
                  <SelectItem value="audit">Internal Audit</SelectItem>
                  <SelectItem value="regulatory">Regulatory Review</SelectItem>
                  <SelectItem value="litigation">Litigation Assessment</SelectItem>
                  <SelectItem value="business">Business Unit Report</SelectItem>
                  <SelectItem value="vendor">Vendor Assessment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="severity">Severity *</Label>
              <Select value={severity} onValueChange={setSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="likelihood">Likelihood *</Label>
              <Select value={likelihood} onValueChange={setLikelihood}>
                <SelectTrigger>
                  <SelectValue placeholder="Select likelihood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rare">Rare</SelectItem>
                  <SelectItem value="unlikely">Unlikely</SelectItem>
                  <SelectItem value="possible">Possible</SelectItem>
                  <SelectItem value="likely">Likely</SelectItem>
                  <SelectItem value="almost-certain">Almost Certain</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="impact">Impact *</Label>
              <Select value={impact} onValueChange={setImpact}>
                <SelectTrigger>
                  <SelectValue placeholder="Select impact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="minor">Minor</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="major">Major</SelectItem>
                  <SelectItem value="catastrophic">Catastrophic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="entity">Entity *</Label>
              <Select value={entity} onValueChange={setEntity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select entity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global Holdings Inc</SelectItem>
                  <SelectItem value="eu">EU Operations Ltd</SelectItem>
                  <SelectItem value="apac">APAC Subsidiary</SelectItem>
                  <SelectItem value="tech">Technology Division</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="jurisdiction">Jurisdiction *</Label>
              <Input
                id="jurisdiction"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                placeholder="e.g., US, EU, UK, Global"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="owner">Risk Owner *</Label>
            <Input
              id="owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Enter responsible person/team"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Risk Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of the risk, potential impacts, and context"
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Risk</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
