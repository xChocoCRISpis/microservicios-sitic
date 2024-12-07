USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Carts].[Delete]') AND type IN (N'P',N'PC'))
BEGIN
	DROP PROCEDURE [Carts].[Delete];
END;
GO

CREATE PROCEDURE [Carts].[Delete]
	@Id INT
WITH ENCRYPTION
AS
BEGIN
	-- Borro primero los items del carro que se pase
	DELETE Cart_Items
	WHERE Cart_Items.cart_id = @Id

	--Borro el carro
	DELETE Carts
	WHERE Carts.id = @Id
END
GO
EXEC sp_recompile N'[Carts].[Delete]';
GO
