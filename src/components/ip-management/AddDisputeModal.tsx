
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddDisputeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddDisputeModal({ open, onOpenChange }: AddDisputeModalProps) {
  const [disputeType, setDisputeType] = useState("");
  const [asset, setAsset] = useState("");
  const [counterparty, setCounterparty] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [priority, setPriority] = useState("");
  const [counsel, setCounsel] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding dispute:", { 
      disputeType, asset, counterparty, jurisdiction, priority, counsel, description 
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Log IP Dispute</DialogTitle>
          <DialogDescription>
            Record a new intellectual property dispute or legal proceeding
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dispute-type">Dispute Type *</Label>
              <Select value={disputeType} onValueChange={setDisputeType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opposition">Opposition</SelectItem>
                  <SelectItem value="infringement">Infringement</SelectItem>
                  <SelectItem value="cancellation">Cancellation</SelectItem>
                  <SelectItem value="cease-desist">Cease & Desist</SelectItem>
                  <SelectItem value="litigation">Litigation</SelectItem>
                  <SelectItem value="invalidation">Invalidation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="asset">IP Asset *</Label>
              <Select value={asset} onValueChange={setAsset}>
                <SelectTrigger>
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="techbrand-logo">TechBrand Logo</SelectItem>
                  <SelectItem value="ai-processing">AI Processing Method</SelectItem>
                  <SelectItem value="dataflow-system">DataFlow System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="counterparty">Counterparty *</Label>
            <Input
              id="counterparty"
              value={counterparty}
              onChange={(e) => setCounterparty(e.target.value)}
              placeholder="Enter counterparty name"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="jurisdiction">Jurisdiction *</Label>
              <Select value={jurisdiction} onValueChange={setJurisdiction}>
                <SelectTrigger>
                  <SelectValue placeholder="Select jurisdiction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="eu">European Union</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="cn">China</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="counsel">Counsel Type</Label>
              <Select value={counsel} onValueChange={setCounsel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select counsel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="external">External</SelectItem>
                  <SelectItem value="mixed">Mixed Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the dispute details, background, and current status"
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Log Dispute</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
