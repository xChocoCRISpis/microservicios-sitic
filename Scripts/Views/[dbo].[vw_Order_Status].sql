USE dbSitiCommerce;
GO


IF EXISTS (SELECT 1 FROM sys.objects
            WHERE object_id = OBJECT_ID(N'[dbo].[vw_OrderStatus]') AND TYPE IN(N'V'))
BEGIN
    DROP VIEW [dbo].[vw_OrderStatus]
END
GO

CREATE VIEW [dbo].[vw_OrderStatus]
WITH ENCRYPTION
AS
    SELECT Id, [Key], Status_Name
    FROM (VALUES
        (1, 'PENDING', 'Pending'),
        (2, 'SENT', 'Sent'),
        (3, 'COMPLETED', 'Completed')
    ) AS StockStatus(Id, [Key], Status_Name);
GO