/*
  # Create Titanic Submissions Table

  ## Overview
  This migration creates a table to store user submissions for the Titanic survival prediction app.

  ## New Tables
  
  ### `submissions`
  Stores user data and survival predictions
  - `id` (uuid, primary key) - Unique identifier for each submission
  - `name` (text) - User's name
  - `gender` (text) - User's gender (male/female)
  - `age` (integer) - User's age
  - `ticket_class` (integer) - Ticket class (1, 2, or 3)
  - `parents` (integer) - Number of parents traveling with user
  - `children` (integer) - Number of children traveling with user
  - `siblings` (integer) - Number of siblings traveling with user
  - `survived` (boolean) - Predicted survival outcome
  - `probability` (numeric) - Survival probability percentage
  - `created_at` (timestamptz) - Timestamp of submission
  
  ## Security
  - Enable RLS on `submissions` table
  - Add policy allowing anyone to insert submissions (public form)
  - Add policy allowing anyone to read total count (for statistics)
*/

CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  gender text NOT NULL,
  age integer NOT NULL,
  ticket_class integer NOT NULL,
  parents integer DEFAULT 0,
  children integer DEFAULT 0,
  siblings integer DEFAULT 0,
  survived boolean NOT NULL,
  probability numeric(5,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert submissions"
  ON submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read submission count"
  ON submissions
  FOR SELECT
  TO anon, authenticated
  USING (true);
