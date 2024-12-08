IF OBJECT_ID('trg_UpdateOrderDate_InsertedUpdated', 'TR') IS NOT NULL
BEGIN
	DROP TRIGGER trg_UpdateOrderDate_InsertedUpdated;
END
GO

CREATE TRIGGER trg_UpdateOrderDate_InsertedUpdated
ON [dbo].[Order_Items]
AFTER UPDATE, INSERT
AS
BEGIN
SET NOCOUNT ON

	DECLARE @Current_date DATETIME = GETDATE();

	UPDATE Orders SET updated_at = @Current_date
	FROM Orders o
	JOIN inserted i ON o.id = i.order_id;
END
