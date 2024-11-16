USE dbSitiCommerce;
GO

IF OBJECT_ID('trg_UpdateStockStatus', 'TR') IS NOT NULL
BEGIN
	DROP TRIGGER trg_UpdateStockStatus;
END
GO

CREATE TRIGGER trg_UpdateStockStatus
ON [dbo].[Products] AFTER INSERT, UPDATE
AS
BEGIN
	IF UPDATE(Current_Stock) OR EXISTS (SELECT 1 FROM inserted)
	BEGIN
		DECLARE @OutOfStock INT, @LowStock INT, @InStock INT, @StockStatusId INT

		SELECT @OutOfStock = Id FROM Stock_Status WHERE [Key] ='OUT_OF_STOCK';
		SELECT @LowStock = Id FROM Stock_Status WHERE [Key] ='LOW_STOCK';
		SELECT @InStock = Id FROM Stock_Status WHERE [Key] ='IN_STOCK';



		-- Matar cursor
		IF CURSOR_STATUS('GLOBAL','cursor_products') >= -1
		BEGIN
			CLOSE cursor_products;
			DEALLOCATE cursor_products;
		END

		--Declaracion de variable (yo lo haría hasta arribota, nomas por los otros lenguajes)
		DECLARE @ProductId INT,
				@CurrentStock INT,
				@MinStock INT;


		DECLARE cursor_products CURSOR FAST_FORWARD FOR
		SELECT Id, current_stock, mix_stock FROM Products
		OPEN cursor_products

		FETCH NEXT FROM cursor_products INTO @ProductId, @CurrentStock, @MinStock;

		WHILE @@FETCH_STATUS = 0
		BEGIN
			IF(ISNULL (@CurrentStock, 0) = 0)
				SET @StockStatusId = @OutOfStock
			ELSE IF(@CurrentStock <= @MinStock)
				SET @StockStatusId = @LowStock
			ELSE
				SET @StockStatusId = @InStock


			UPDATE Products SET stock_status_id = @StockStatusId WHERE Id = @ProductID;

			FETCH NEXT FROM  cursor_products INTO  @ProductId, @CurrentStock, @MinStock;
		END
		CLOSE cursor_products;
		DEALLOCATE cursor_products;
	END
END