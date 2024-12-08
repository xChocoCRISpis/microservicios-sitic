USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Cart_Items].[GetAll]') AND type IN (N'P',N'PC'))
BEGIN
	DROP PROCEDURE [Cart_Items].[GetAll];
END;
GO

CREATE PROCEDURE [Cart_Items].[GetAll]

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
	FROM Cart_Items ci; 
END
GO
EXEC sp_recompile N'[Cart_Items].[GetAll]';
GO
