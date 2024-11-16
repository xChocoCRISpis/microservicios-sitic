USE dbSitiCommerce;
GO

IF OBJECT_ID('trg_UpdateProducts_UpdatedAt', 'TR') IS NOT NULL
BEGIN
	DROP TRIGGER trg_UpdateProducts_UpdatedAt;
END
GO


CREATE TRIGGER trg_UpdateProducts_UpdatedAt
ON [dbo].[Products] AFTER UPDATE
AS
BEGIN
	-- No cuente el affectedRows
	SET NOCOUNT ON

	UPDATE Products SET update_at = GETDATE() FROM inserted i where Products.id = i.id;
END