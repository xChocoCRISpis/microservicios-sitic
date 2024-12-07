IF OBJECT_ID('trg_UpdateCartDate_IU', 'TR') IS NOT NULL
BEGIN
	DROP TRIGGER trg_UpdateCartDate_IU;
END
GO

CREATE TRIGGER trg_UpdateCartDate_IU
ON [dbo].[Cart_Items]
AFTER UPDATE, INSERT
AS
BEGIN
	DECLARE @Current_date DATETIME = GETDATE();

	UPDATE Cart_Items SET updated_at = @Current_date 
	FROM Cart_Items ci
	JOIN inserted ON ci.id = inserted.id;

	UPDATE Carts SET updated_at = @Current_date
	FROM Carts c
	JOIN inserted i ON c.id = i.cart_id;
END



