-- Esta cosa sirve para crear un fk con validaciones y con constraint

IF NOT EXISTS(SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_Cart_Items_Cart_Id')
BEGIN
	ALTER TABLE [dbo].[Cart_Items]
	ADD CONSTRAINT FK_Cart_Items_Cart_Id
	FOREIGN KEY ([Cart_Id]) REFERENCES [dbo].[Carts]([Id])
END
GO