using EmployeeManagement.API.Interfaces;
using EmployeeManagement.API.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace EmployeeManagement.API.Services
{
    public class PdfService : IPdfService
    {
        public byte[] GenerateEmployeesPdf(List<Employee> employees)
        {
            QuestPDF.Settings.License = LicenseType.Community;

            var document = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Margin(20);

                    page.Header()
                        .Text("Employee Report")
                        .FontSize(20)
                        .Bold();

                    page.Content()
                        .Table(table =>
                        {
                            table.ColumnsDefinition(columns =>
                            {
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                            });

                            table.Header(header =>
                            {
                                header.Cell().Text("Name").Bold();
                                header.Cell().Text("Email").Bold();
                                header.Cell().Text("Department").Bold();
                                header.Cell().Text("Salary").Bold();
                            });

                            foreach (var employee in employees)
                            {
                                table.Cell().Text(employee.Name);
                                table.Cell().Text(employee.Email);
                                table.Cell().Text(employee.Department);
                                table.Cell().Text(employee.Salary.ToString());
                            }
                        });

                    page.Footer()
                        .AlignCenter()
                        .Text(x =>
                        {
                            x.Span("Generated on ");
                            x.Span(DateTime.Now.ToString("dd/MM/yyyy"));
                        });
                });
            });

            return document.GeneratePdf();
        }
    }
}