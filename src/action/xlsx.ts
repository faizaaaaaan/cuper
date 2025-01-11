import * as XLSX from "xlsx";

export const exportToExcel = (data: any, fileName: string) => {
  // Create a worksheet from the data
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a new workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Create a binary Excel file
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  // Create a Blob from the buffer
  const dataBlob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  // Create a link element to trigger the download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(dataBlob);
  link.setAttribute("download", `${fileName}.xlsx`);

  // Append the link to the body and trigger the click event
  document.body.appendChild(link);
  link.click();

  // Clean up by removing the link
  document.body.removeChild(link);
};
