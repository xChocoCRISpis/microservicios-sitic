IF OBJECT_ID('trg_UpdateOrderDate_Deleted', 'TR') IS NOT NULL
BEGIN
	DROP TRIGGER trg_UpdateOrderDate_Deleted;
END
GO

CREATE TRIGGER trg_UpdateOrderDate_Deleted
ON [dbo].[Order_Items]
AFTER DELETE
AS
BEGIN
SET NOCOUNT ON

	DECLARE @Current_date DATETIME = GETDATE();

	UPDATE Orders SET updated_at = @Current_date
	FROM Orders o
	JOIN deleted d ON o.id = d.order_id;
END
