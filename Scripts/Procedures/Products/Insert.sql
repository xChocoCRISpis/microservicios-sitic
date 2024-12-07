USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Products].[Insert]'))
BEGIN
    DROP PROCEDURE [Products].[Insert];
END;
GO

CREATE PROCEDURE [Products].[Insert]
    @Name VARCHAR(255),
    @Description TEXT,
    @Price DECIMAL(18,2),
    @CurrentStock INT,
    @MaxStock INT,
    @MinStock INT,
    @ImagePath VARCHAR(255),
    @Id INT OUTPUT
WITH ENCRYPTION
AS
BEGIN
    INSERT INTO Products (Name, Description, Price, current_stock,
    Max_Stock, min_stock, image_path)
    VALUES (@Name, @Description, @Price, @CurrentStock,
    @MaxStock, @MinStock, @ImagePath);

    SET @Id = SCOPE_IDENTITY();
END;
GO
EXEC sp_recompile N'[Products].[Insert]'
GO