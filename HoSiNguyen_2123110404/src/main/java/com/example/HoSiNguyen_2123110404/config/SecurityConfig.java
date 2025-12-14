package com.example.HoSiNguyen_2123110404.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.HoSiNguyen_2123110404.security.JwtAuthFilter;
import com.example.HoSiNguyen_2123110404.service.UserDetailsServiceImpl;

@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailsServiceImpl userDetailsService;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter, UserDetailsServiceImpl userDetailsService) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userDetailsService = userDetailsService;
    }

    // Mã hóa mật khẩu
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Cấu hình AuthenticationManager
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // Provider xác thực với UserDetailsService + passwordEncoder
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    // Cấu hình CORS cho React
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("http://localhost:5173")); // React dev
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Authorization"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    // Cấu hình Security filter chain (phiên bản dùng hasAuthority)
    @Bean
    public SecurityFilterChain securityFilterChain(org.springframework.security.config.annotation.web.builders.HttpSecurity http)
            throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                // Cho phép preflight request
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                // Cho phép login và register không cần token
                .requestMatchers("/api/users/login", "/api/users/register").permitAll()
                // Cho phép xem ảnh public
                .requestMatchers("/uploads/**").permitAll()
                // Cho phép public xem danh mục, thương hiệu, sản phẩm
                .requestMatchers("/api/categories/**", "/api/brands/**", "/api/products/**").permitAll()
                // Cho phép public GET banner
                .requestMatchers(HttpMethod.GET, "/api/banners/**").permitAll()
                // Chỉ admin CRUD banner
                .requestMatchers(HttpMethod.POST, "/api/banners/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/banners/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/banners/**").hasAuthority("ADMIN")
                //////menu
                // Chỉ admin CRUD menu
.requestMatchers(HttpMethod.POST, "/api/menus/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/menus/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/menus/**").hasAuthority("ADMIN")
                // Cho public GET menu theo vị trí/status
                .requestMatchers(HttpMethod.GET, "/api/menus/**").permitAll()
                // -------------------- PHÂN QUYỀN ORDER --------------------
                // Xem danh sách & chi tiết đơn hàng: chỉ USER hoặc ADMIN
                .requestMatchers(HttpMethod.GET, "/api/orders/**").hasAnyAuthority("USER", "ADMIN")
                // Tạo đơn hàng: chỉ USER (khi người dùng mua hàng)
                .requestMatchers(HttpMethod.POST, "/api/orders").hasAnyAuthority("USER", "ADMIN")
                // Sửa hoặc xóa đơn hàng: chỉ ADMIN
                .requestMatchers(HttpMethod.PUT, "/api/orders/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/orders/**").hasAuthority("ADMIN")
                // ------------------------------------------------------------
                // -------------------- PHÂN QUYỀN DASHBOARD --------------------
                // Chỉ ADMIN mới được truy cập tất cả các endpoint của dashboard
                .requestMatchers("/api/admin/dashboard/**").hasAuthority("ADMIN")
                // -------------------- PHÂN QUYỀN CONTACT --------------------
                .requestMatchers(HttpMethod.POST, "/api/contacts/**").permitAll() // Public gửi contact
                .requestMatchers(HttpMethod.GET, "/api/contacts/**").hasAuthority("ADMIN") // Admin xem danh sách, chi tiết
                .requestMatchers(HttpMethod.PUT, "/api/contacts/**").hasAuthority("ADMIN") // Admin cập nhật status
                .requestMatchers(HttpMethod.DELETE, "/api/contacts/**").hasAuthority("ADMIN") // Admin xóa contact
                // -------------------- PHÂN QUYỀN POST --------------------
                // Chỉ admin CRUD post
                .requestMatchers(HttpMethod.POST, "/api/posts/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/posts/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/posts/**").hasAuthority("ADMIN")
                // Cho phép public GET post (nếu muốn tất cả user có thể xem)
                .requestMatchers(HttpMethod.GET, "/api/posts/**").permitAll()
                // Các route khác cần đăng nhập
                .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        return http.build();
    }
}
