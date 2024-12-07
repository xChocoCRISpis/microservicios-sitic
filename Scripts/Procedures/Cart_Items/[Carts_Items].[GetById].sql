USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Cart_Items].[GetById]') AND type IN (N'P',N'PC'))
BEGIN
	DROP PROCEDURE [Cart_Items].[GetById];
END;
GO

CREATE PROCEDURE [Cart_Items].[GetById]
	@Id INT
WITH ENCRYPTION
AS
BEGIN
	SELECT  
		ci.id AS Id,
		ci.cart_id AS Cart_Id,
		ci.product_id AS Product_Id,
		ci.quantity AS Quantity,
		ci.price AS Price,
		ci.created_at AS Created_At,
		ci.updated_at AS Updated_At
	FROM Cart_Items ci
	WHERE ci.id = @Id; 
END
GO
EXEC sp_recompile N'[Cart_Items].[GetById]';
GO
