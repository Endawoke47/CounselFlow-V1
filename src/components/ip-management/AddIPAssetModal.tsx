
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddIPAssetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddIPAssetModal({ open, onOpenChange }: AddIPAssetModalProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [owner, setOwner] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [filingDate, setFilingDate] = useState("");
  const [classes, setClasses] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding IP asset:", { 
      title, type, owner, jurisdiction, registrationNo, filingDate, classes, description 
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add IP Asset</DialogTitle>
          <DialogDescription>
            Register a new intellectual property asset
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Asset Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter asset title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Asset Type *</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trademark">Trademark</SelectItem>
                  <SelectItem value="patent">Patent</SelectItem>
                  <SelectItem value="copyright">Copyright</SelectItem>
                  <SelectItem value="design">Industrial Design</SelectItem>
                  <SelectItem value="domain">Domain Name</SelectItem>
                  <SelectItem value="trade-secret">Trade Secret</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="owner">Owner Entity *</Label>
              <Select value={owner} onValueChange={setOwner}>
                <SelectTrigger>
                  <SelectValue placeholder="Select owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="techcorp-ltd">TechCorp Ltd</SelectItem>
                  <SelectItem value="techcorp-inc">TechCorp Inc</SelectItem>
                  <SelectItem value="techcorp-uk">TechCorp UK</SelectItem>
                  <SelectItem value="techcorp-gmbh">TechCorp GmbH</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jurisdiction">Jurisdiction *</Label>
              <Select value={jurisdiction} onValueChange={setJurisdiction}>
                <SelectTrigger>
                  <SelectValue placeholder="Select jurisdiction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ep">European Union</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="cn">China</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="registration-no">Registration/Application No.</Label>
              <Input
                id="registration-no"
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
                placeholder="Enter registration number"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="filing-date">Filing Date</Label>
              <Input
                id="filing-date"
                type="date"
                value={filingDate}
                onChange={(e) => setFilingDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="classes">Classes/Classification</Label>
              <Input
                id="classes"
                value={classes}
                onChange={(e) => setClasses(e.target.value)}
                placeholder="e.g., Class 9, 42 or G06F 17/30"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the IP asset"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Asset</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
