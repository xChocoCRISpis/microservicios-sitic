USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Orders].[Insert]') AND type IN (N'P',N'PC'))
BEGIN
	DROP PROCEDURE [Orders].[Insert];
END;
GO

CREATE PROCEDURE [Orders].[Insert]
	@Cart_Id INT,
	@Id INT OUT
WITH ENCRYPTION
AS
BEGIN

	--Validacion de existencia de carro y que tenga items
	IF NOT EXISTS(SELECT 1 FROM Carts c JOIN Cart_Items ci on ci.cart_id=c.id WHERE c.id = @Cart_Id) BEGIN
		RETURN;
	END;


	-- Validacion de stock para cada item del carro
	IF EXISTS (
		SELECT 1
        FROM Cart_Items ci
        JOIN Products p ON p.id = ci.product_id
        WHERE ci.cart_id = 1
          AND p.current_stock <= ci.quantity
    )BEGIN
		RETURN;
	END;

	--Insertar una orden de compra
	INSERT INTO Orders (total_price,[status]) VALUES
	((SELECT SUM(ci.quantity*p.price)
		FROM Cart_Items ci
		JOIN Carts ON Carts.id = ci.cart_id
		JOIN Products p ON p.id = ci.product_id 
		WHERE Carts.id = @Cart_Id AND p.current_stock >= ci.quantity),
		(SELECT [Key] FROM [dbo].vw_OrderStatus WHERE [Key] = 'PENDING'));

	SET @Id = SCOPE_IDENTITY();

	--Insercion de datos en order items
	INSERT INTO Order_Items (product_id, quantity, price, order_id)
		SELECT ci.product_id, ci.quantity, ci.quantity*p.price, @Id
		FROM Cart_Items ci
		JOIN Carts ON Carts.id = ci.cart_id
		JOIN Products p ON p.id = ci.product_id 
		WHERE Carts.id = @Cart_Id AND p.current_stock >= ci.quantity;

	-- Actualizar el stock de los productos
    UPDATE Products
    SET current_stock = current_stock - ci.quantity
    FROM Products p
    JOIN Cart_Items ci ON ci.product_id = p.id
    WHERE ci.cart_id = @Cart_Id;


	--Eliminación del carrito
	IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Carts].[Delete]') AND type IN (N'P',N'PC'))
	BEGIN
		EXEC [Carts].[Delete] @Cart_Id;
	END;


	

	


	/* USO DE UN CURSOR lo deje de lado por una consulta entera
	--Cerrar cursor
	IF CURSOR_STATUS('GLOBAL', 'cursor_orders') >= -1
		BEGIN
			CLOSE cursor_orders
			DEALLOCATE cursor_orders
		END

	--Declaracion de variables
	DECLARE @Product_Id INT, @Quantity INT;

	DECLARE cursor_orders CURSOR FAST_FORWARD
	FOR 
		SELECT ci.product_id, ci.quantity  FROM Cart_Items ci 
		JOIN Carts c ON ci.cart_id = c.id
		WHERE c.id = @Cart_Id;
	OPEN cursor_orders;
	FETCH NEXT FROM cursor_orders INTO @Product_Id,@Quantity;

	WHILE @@FETCH_STATUS = 0
	BEGIN
		-- Operaciones con las variables
		FETCH NEXT FROM cursor_orders INTO variable_list;
	END;

	CLOSE cursor_orders;
	DEALLOCATE cursor_orders;
	*/
END
GO
EXEC sp_recompile N'[Orders].[Insert]';
GO
