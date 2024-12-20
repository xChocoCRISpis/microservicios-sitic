USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Cart_Items].[Update]') AND type IN (N'P',N'PC'))
BEGIN
	DROP PROCEDURE [Cart_Items].[Update];
END;
GO

CREATE PROCEDURE [Cart_Items].[Update]
	@Id INT,
	@Quantity INT
WITH ENCRYPTION
AS
BEGIN
	UPDATE ci
    SET 
        ci.quantity = @Quantity,
        ci.price = p.price * @Quantity
    FROM Cart_Items ci
    JOIN Products p ON p.id = ci.product_id
    WHERE ci.id = @Id;
END
GO
EXEC sp_recompile N'[Cart_Items].[Update]';
GO
