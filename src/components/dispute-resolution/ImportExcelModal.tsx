
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle, 
  Download,
  FileText,
  X
} from "lucide-react";

interface ImportExcelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportExcelModal({ open, onOpenChange }: ImportExcelModalProps) {
  const [uploadStep, setUploadStep] = useState<"upload" | "preview" | "import" | "complete">("upload");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importResults, setImportResults] = useState({
    total: 0,
    successful: 0,
    errors: 0,
    warnings: 0
  });

  // Mock data for preview
  const previewData = [
    {
      row: 1,
      title: "Contract Breach - ABC Corp",
      entity: "Tech Corp Ltd",
      counterparty: "ABC Corporation",
      status: "Open",
      priority: "High",
      exposure: 250000,
      errors: []
    },
    {
      row: 2,
      title: "Employment Dispute",
      entity: "Tech Corp UK",
      counterparty: "John Doe",
      status: "In Review",
      priority: "Medium",
      exposure: 75000,
      errors: []
    },
    {
      row: 3,
      title: "Patent Infringement",
      entity: "Innovation Labs",
      counterparty: "Patent Troll Inc",
      status: "Escalated",
      priority: "Critical",
      exposure: 1200000,
      errors: ["Missing jurisdiction field"]
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Simulate file processing
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploadStep("preview");
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };

  const handleImport = () => {
    setUploadStep("import");
    setUploadProgress(0);
    
    // Simulate import process
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setImportResults({
            total: 3,
            successful: 2,
            errors: 1,
            warnings: 0
          });
          setUploadStep("complete");
          return 100;
        }
        return prev + 15;
      });
    }, 200);
  };

  const resetImport = () => {
    setUploadStep("upload");
    setUploadProgress(0);
    setSelectedFile(null);
    setImportResults({ total: 0, successful: 0, errors: 0, warnings: 0 });
  };

  const downloadTemplate = () => {
    // In a real application, this would download an actual Excel template
    console.log("Downloading Excel template...");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Import Disputes from Excel
          </DialogTitle>
          <DialogDescription>
            Upload an Excel file to import multiple disputes at once
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="import" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="import">Import Data</TabsTrigger>
            <TabsTrigger value="template">Download Template</TabsTrigger>
          </TabsList>

          <TabsContent value="template" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Excel Template</CardTitle>
                <CardDescription>
                  Download the template to ensure your data is formatted correctly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Required Columns:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Title (Required)</li>
                        <li>• Entity (Required)</li>
                        <li>• Counterparty (Required)</li>
                        <li>• Status</li>
                        <li>• Priority</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Financial Exposure</li>
                        <li>• Owner</li>
                        <li>• Jurisdiction</li>
                        <li>• Case Type</li>
                        <li>• Description</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <Button onClick={downloadTemplate} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Excel Template
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="import" className="space-y-4">
            {uploadStep === "upload" && (
              <Card>
                <CardHeader>
                  <CardTitle>Upload Excel File</CardTitle>
                  <CardDescription>
                    Select an Excel file (.xlsx, .xls) containing dispute data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <div className="space-y-2">
                      <p className="text-lg font-medium">Drop your Excel file here</p>
                      <p className="text-muted-foreground">or click to browse</p>
                    </div>
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="excel-upload"
                    />
                    <label htmlFor="excel-upload">
                      <Button className="mt-4" asChild>
                        <span className="cursor-pointer">
                          <FileSpreadsheet className="h-4 w-4 mr-2" />
                          Choose File
                        </span>
                      </Button>
                    </label>
                  </div>
                  
                  {selectedFile && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileSpreadsheet className="h-5 w-5" />
                          <div>
                            <p className="font-medium">{selectedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(selectedFile.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Processing file...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {uploadStep === "preview" && (
              <Card>
                <CardHeader>
                  <CardTitle>Preview Import Data</CardTitle>
                  <CardDescription>
                    Review the data before importing. Fix any errors shown below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {previewData.map((row) => (
                      <div key={row.row} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Row {row.row}: {row.title}</h4>
                          {row.errors.length > 0 ? (
                            <Badge variant="destructive">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Error
                            </Badge>
                          ) : (
                            <Badge variant="default">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Valid
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>Entity: {row.entity}</div>
                          <div>Status: {row.status}</div>
                          <div>Priority: {row.priority}</div>
                          <div>Counterparty: {row.counterparty}</div>
                          <div>Exposure: ${row.exposure.toLocaleString()}</div>
                        </div>
                        {row.errors.length > 0 && (
                          <Alert className="mt-2">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              {row.errors.join(", ")}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={resetImport}>
                      Cancel
                    </Button>
                    <Button onClick={handleImport}>
                      Import {previewData.length} Disputes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {uploadStep === "import" && (
              <Card>
                <CardHeader>
                  <CardTitle>Importing Data</CardTitle>
                  <CardDescription>Please wait while we import your disputes...</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Importing disputes...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                </CardContent>
              </Card>
            )}

            {uploadStep === "complete" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Import Complete
                  </CardTitle>
                  <CardDescription>Your disputes have been imported successfully</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{importResults.successful}</div>
                      <div className="text-sm text-green-800">Successfully Imported</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{importResults.errors}</div>
                      <div className="text-sm text-red-800">Errors</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={resetImport}>
                      Import More
                    </Button>
                    <Button onClick={() => onOpenChange(false)}>
                      Done
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
