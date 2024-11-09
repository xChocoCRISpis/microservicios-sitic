IF EXISTS (SELECT 1 FROM sys.objects
            WHERE object_id = OBJECT_ID(N'[dbo].[vwStockStatus]') AND TYPE IN(N'V'))
BEGIN
    DROP VIEW [dbo].[vwStockStatus]
END
GO

CREATE VIEW [dbo].[vwStockStatus]
WITH ENCRYPTION
AS
    SELECT Id, [Key], Status_Name
    FROM (VALUES
        (1, 'IN_STOCK', 'In Stock'),
        (2, 'OUT_OF_STOCK', 'Out of Stock'),
        (3, 'LOW_STOCK', 'Low Stock')
    ) AS StockStatus(Id, [Key], Status_Name);
GO
