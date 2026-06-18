-- Tabela de Grupos (Groups)
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela de Participantes (Participants)
CREATE TABLE participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pendente' CHECK (status IN ('Pronto', 'Pendente')),
  avatar_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_email_per_group UNIQUE (group_id, email)
);

-- Tabela de Sorteio (Draws)
CREATE TABLE draws (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE NOT NULL,
  giver_id UUID REFERENCES participants(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES participants(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_giver UNIQUE (group_id, giver_id),
  CONSTRAINT unique_receiver UNIQUE (group_id, receiver_id),
  CONSTRAINT self_draw_check CHECK (giver_id <> receiver_id)
);

-- Habilitar o Realtime para atualizar status na tela automaticamente
alter publication supabase_realtime add table participants;
alter publication supabase_realtime add table groups;
alter publication supabase_realtime add table draws;
