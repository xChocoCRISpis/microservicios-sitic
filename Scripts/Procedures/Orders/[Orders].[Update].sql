USE dbSitiCommerce;
GO

IF EXISTS(SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Orders].[Update]') AND type IN (N'P',N'PC'))
BEGIN
	DROP PROCEDURE [Orders].[Update];
END;
GO

CREATE PROCEDURE [Orders].[Update]
	@Id INT,
	@Status VARCHAR(50),
	@Total_Price DECIMAL(20,2) = NULL
WITH ENCRYPTION
AS
BEGIN
	IF((@Total_Price IS NULL) OR (@Total_Price = 0)) BEGIN
		UPDATE Orders SET
			[status] = @Status
		WHERE id = @Id;
	END; ELSE BEGIN
		UPDATE Orders SET
			[status] = @Status,
			total_price = @Total_Price
		WHERE id = @Id;
	END;
END
GO
EXEC sp_recompile N'[Orders].[Update]';
GO
