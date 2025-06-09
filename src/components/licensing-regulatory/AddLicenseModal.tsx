
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AddLicenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddLicenseModal({ open, onOpenChange }: AddLicenseModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    entity: "",
    jurisdiction: "",
    regulator: "",
    type: "",
    licenseId: "",
    issuedDate: null as Date | null,
    expiryDate: null as Date | null,
    renewalCycle: "",
    renewalLeadTime: "",
    owner: "",
    status: "",
    notes: "",
    tags: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("License data:", formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      title: "",
      entity: "",
      jurisdiction: "",
      regulator: "",
      type: "",
      licenseId: "",
      issuedDate: null,
      expiryDate: null,
      renewalCycle: "",
      renewalLeadTime: "",
      owner: "",
      status: "",
      notes: "",
      tags: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New License</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">License Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter license title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entity">Entity *</Label>
              <Select value={formData.entity} onValueChange={(value) => setFormData({ ...formData, entity: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select entity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uk">TechCorp UK Ltd</SelectItem>
                  <SelectItem value="de">TechCorp GmbH</SelectItem>
                  <SelectItem value="us">TechCorp Inc</SelectItem>
                  <SelectItem value="sg">TechCorp Pte Ltd</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jurisdiction">Jurisdiction *</Label>
              <Select value={formData.jurisdiction} onValueChange={(value) => setFormData({ ...formData, jurisdiction: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select jurisdiction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="sg">Singapore</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="regulator">Regulator</Label>
              <Input
                id="regulator"
                value={formData.regulator}
                onChange={(e) => setFormData({ ...formData, regulator: e.target.value })}
                placeholder="Enter regulator name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">License Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select license type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Financial Services</SelectItem>
                  <SelectItem value="data">Data Protection</SelectItem>
                  <SelectItem value="broadcasting">Broadcasting</SelectItem>
                  <SelectItem value="telecom">Telecommunications</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseId">License ID</Label>
              <Input
                id="licenseId"
                value={formData.licenseId}
                onChange={(e) => setFormData({ ...formData, licenseId: e.target.value })}
                placeholder="Enter license ID"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Issued Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.issuedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.issuedDate ? format(formData.issuedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.issuedDate || undefined}
                    onSelect={(date) => setFormData({ ...formData, issuedDate: date || null })}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Expiry Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.expiryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.expiryDate ? format(formData.expiryDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.expiryDate || undefined}
                    onSelect={(date) => setFormData({ ...formData, expiryDate: date || null })}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="renewalCycle">Renewal Cycle</Label>
              <Select value={formData.renewalCycle} onValueChange={(value) => setFormData({ ...formData, renewalCycle: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select renewal cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="biennial">Biennial</SelectItem>
                  <SelectItem value="triennial">Triennial</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="renewalLeadTime">Renewal Lead Time (days)</Label>
              <Input
                id="renewalLeadTime"
                type="number"
                value={formData.renewalLeadTime}
                onChange={(e) => setFormData({ ...formData, renewalLeadTime: e.target.value })}
                placeholder="90"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="owner">Owner</Label>
              <Select value={formData.owner} onValueChange={(value) => setFormData({ ...formData, owner: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="michael">Michael Chen</SelectItem>
                  <SelectItem value="emma">Emma Wilson</SelectItem>
                  <SelectItem value="david">David Lee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Enter tags separated by commas"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Enter any additional notes"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add License</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
