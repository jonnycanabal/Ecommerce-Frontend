package com.aplicativoEcommerce.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class AplicativoEcommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AplicativoEcommerceApplication.class, args);

	}

	@Configuration
	@EnableWebMvc
	public class CorsConfig implements WebMvcConfigurer {

		@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/**").allowedOrigins("http://localhost:4200") // Cambia esto a tu origen permitido
					.allowedMethods("GET", "POST", "PUT", "DELETE").allowCredentials(true)
					.allowedHeaders("Authorization", "Content-Type");
		}
	}
}
