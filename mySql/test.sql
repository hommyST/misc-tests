USE campaigns;

SELECT 
    DISTINCT address, provider, base_name, current_tariff, current_speed, current_price,
		new_tariff, new_speed, channels_count, new_price
FROM campaigns.smotreshka_telekonika;