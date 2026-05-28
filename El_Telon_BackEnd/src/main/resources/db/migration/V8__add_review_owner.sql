ALTER TABLE `resenas`
    ADD COLUMN `autor_correo` varchar(255) NULL AFTER `autor`,
    ADD COLUMN `id_usuario` bigint NULL AFTER `id_padre`,
    ADD KEY `id_usuario` (`id_usuario`),
    ADD CONSTRAINT `resenas_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;