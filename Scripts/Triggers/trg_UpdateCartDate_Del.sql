IF OBJECT_ID('trg_UpdateCartDate_D', 'TR') IS NOT NULL
BEGIN
	DROP TRIGGER trg_UpdateCartDate_D;
END
GO

CREATE TRIGGER trg_UpdateCartDate_D
ON [dbo].[Cart_Items]
AFTER DELETE
AS
BEGIN
	DECLARE @Current_date DATETIME = GETDATE();

	UPDATE Carts SET updated_at = @Current_date
	FROM Carts c
	JOIN deleted d ON c.id = d.cart_id;
END
