package com.app.ecommerce.services.implement;

import java.io.IOException;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ecommerce.models.AccountOrder;
import com.app.ecommerce.respositories.AccountOrderRepository;
import com.app.ecommerce.services.IExportExcelServices;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NoArgsConstructor;

@Service
@NoArgsConstructor
public class ExportExcelServicesImp implements IExportExcelServices {

    List<AccountOrder> accountOrders;

    private XSSFWorkbook workbook;

    private XSSFSheet sheet;

    @Autowired
    private AccountOrderRepository accountOrderRepository;

    public ExportExcelServicesImp(List<AccountOrder> accountOrders) {
        this.accountOrders = accountOrders;
        workbook = new XSSFWorkbook();
    }

    @Override
    public void writeHeaderLine() {
        sheet = workbook.createSheet("Orders");

        Row row = sheet.createRow(0);

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);

        createCell(row, 0, "Order ID", style);
        createCell(row, 1, "Username", style);
        createCell(row, 2, "Status", style);
        createCell(row, 3, "Total", style);

    }

    @Override
    public void createCell(Row row, int columnCount, Object value, CellStyle style) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);
        if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        } else {
            cell.setCellValue((String) value);
        }
        cell.setCellStyle(style);
    }

    @Override
    public void writeDataLines() {
        int rowCount = 1;
        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setFontHeight(14);
        style.setFont(font);
        // accountOrders = accountOrderRepository.findById();
        for (AccountOrder user : accountOrders) {
            Row row = sheet.createRow(rowCount++);
            int columnCount = 0;
            createCell(row, columnCount++, user.getId(), style);
            createCell(row, columnCount++, user.getUsername().toString(), style);
            createCell(row, columnCount++, user.getStatus().toString(), style);
            createCell(row, columnCount++, user.getTotal(), style);
        }
    }

    @Override
    public void export(HttpServletResponse response) throws IOException {
        writeHeaderLine();
        writeDataLines();
        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
        outputStream.close();
    }
}