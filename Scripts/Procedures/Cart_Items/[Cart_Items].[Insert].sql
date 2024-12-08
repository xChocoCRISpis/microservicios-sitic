USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Cart_Items].[Insert]') AND type IN (N'P',N'PC'))
BEGIN
	DROP PROCEDURE [Cart_Items].[Insert];
END;
GO

CREATE PROCEDURE [Cart_Items].[Insert]
	@Cart_Id INT = 0 OUT, -- Es entrada y salida
	@Product_Id INT,
	@Quantity INT,
	@Id INT = 0 OUT
WITH ENCRYPTION
AS
BEGIN
	--Validar la existencia del producto y que haya suficiente stock;
	IF NOT EXISTS (SELECT 1 FROM Products WHERE @Product_Id=id AND @Quantity <= current_stock) BEGIN
		RETURN;
	END;


	--Si no viene un carro, significa que no existe, y por tanto se debe insertar
	IF (@Cart_Id = 0) BEGIN
		DECLARE @Inserted_cart INT;
		-- Insertar un registro en la tabla carts con default values (solo para reservar el carrito)
			INSERT INTO Carts DEFAULT VALUES;
		--Obtener el id del cart insertado
		SET @Inserted_cart = SCOPE_IDENTITY();

		INSERT INTO Cart_Items (cart_id,product_id,quantity,price) VALUES (
		@Inserted_cart, 
		@Product_Id, 
		@Quantity,
		(SELECT price*@Quantity FROM Products WHERE id = @Product_Id));

		--Devolver las salidas
		SET @Cart_Id = @Inserted_cart;
		SET @Id = SCOPE_IDENTITY();

	END ELSE BEGIN
		IF NOT EXISTS (SELECT 1 FROM Carts WHERE id=@Cart_ID)BEGIN
			SET @Cart_Id = 0;
			RETURN;
		END;

		INSERT INTO Cart_Items (cart_id,product_id,quantity,price) VALUES (
		@Cart_Id, @Product_Id,@Quantity,(SELECT price*@Quantity FROM Products WHERE id = @Product_Id));

		SET @Id = SCOPE_IDENTITY();
	END;	
END
GO
EXEC sp_recompile N'[Cart_Items].[Insert]';
GO
