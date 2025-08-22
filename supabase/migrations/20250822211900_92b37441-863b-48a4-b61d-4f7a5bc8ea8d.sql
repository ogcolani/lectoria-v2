-- Add new columns to orders table for the new system
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS preview_ratio numeric DEFAULT 0.15,
  ADD COLUMN IF NOT EXISTS print_status text DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS shipping_name text,
  ADD COLUMN IF NOT EXISTS shipping_address text,
  ADD COLUMN IF NOT EXISTS variant text;