package com.app.ecommerce.services;

import java.io.IOException;

import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;

import jakarta.servlet.http.HttpServletResponse;

public interface IExportExcelServices {
    public void writeHeaderLine();

    public void createCell(Row row, int columnCount, Object value, CellStyle style);

    public void writeDataLines();

    public void export(HttpServletResponse response) throws IOException;
}
