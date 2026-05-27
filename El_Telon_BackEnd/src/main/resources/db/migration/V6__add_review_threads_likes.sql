ALTER TABLE `resenas`
  ADD COLUMN `likes` int NOT NULL DEFAULT 0,
  ADD COLUMN `id_padre` bigint NULL;

ALTER TABLE `resenas`
  ADD KEY `id_padre` (`id_padre`),
  ADD CONSTRAINT `resenas_ibfk_2` FOREIGN KEY (`id_padre`) REFERENCES `resenas` (`id`) ON DELETE CASCADE;
