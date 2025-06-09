
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, FileText, AlertCircle, CheckCircle } from "lucide-react";

interface ImportExcelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportExcelModal({ open, onOpenChange }: ImportExcelModalProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<{[key: number]: string[]}>({});

  // Mock preview data for demonstration
  const mockPreviewData = [
    {
      row: 1,
      title: "Contract Breach - ABC Corp",
      entity: "Tech Corp Ltd",
      counterparty: "ABC Corporation",
      status: "Open",
      exposure: "250000",
      provisioned: "Yes",
      owner: "Sarah Johnson",
      errors: []
    },
    {
      row: 2,
      title: "Employment Dispute",
      entity: "Tech Corp UK",
      counterparty: "John Doe",
      status: "In Review",
      exposure: "75000",
      provisioned: "No",
      owner: "",
      errors: ["Owner is required"]
    },
    {
      row: 3,
      title: "Lease Dispute",
      entity: "Invalid Entity",
      counterparty: "Property Co",
      status: "Open",
      exposure: "not_a_number",
      provisioned: "Yes",
      owner: "Mike Chen",
      errors: ["Invalid entity", "Exposure must be a number"]
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // In real implementation, parse Excel file here
      setPreviewData(mockPreviewData);
    }
  };

  const handleImport = () => {
    const validRows = previewData.filter(row => row.errors.length === 0);
    console.log("Importing", validRows.length, "valid disputes");
    onOpenChange(false);
    setUploadedFile(null);
    setPreviewData([]);
  };

  const downloadTemplate = () => {
    // In real implementation, generate and download Excel template
    console.log("Downloading template");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Disputes from Excel</DialogTitle>
          <DialogDescription>
            Upload an Excel file with dispute data or download our template to get started
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload File
              </CardTitle>
              <CardDescription>
                Select an Excel file (.xlsx, .xls) containing dispute data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                </div>
                <Button variant="outline" onClick={downloadTemplate}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
              
              {uploadedFile && (
                <div className="mt-4 p-3 bg-muted rounded-md flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">{uploadedFile.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(uploadedFile.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview Section */}
          {previewData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Preview & Validation
                  <Badge variant="outline">
                    {previewData.filter(row => row.errors.length === 0).length} / {previewData.length} valid
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Review the data before importing. Rows with errors will be skipped.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Row</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Entity</TableHead>
                      <TableHead>Counterparty</TableHead>
                      <TableHead>Exposure</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Errors</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.row}</TableCell>
                        <TableCell>
                          {row.errors.length === 0 ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.entity}</TableCell>
                        <TableCell>{row.counterparty}</TableCell>
                        <TableCell>{row.exposure}</TableCell>
                        <TableCell>{row.owner}</TableCell>
                        <TableCell>
                          {row.errors.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {row.errors.map((error: string, errorIndex: number) => (
                                <Badge key={errorIndex} variant="destructive" className="text-xs">
                                  {error}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {previewData.length > 0 && (
            <Button 
              onClick={handleImport}
              disabled={previewData.filter(row => row.errors.length === 0).length === 0}
            >
              Import {previewData.filter(row => row.errors.length === 0).length} Disputes
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
