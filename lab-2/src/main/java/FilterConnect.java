//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//import javax.servlet.*;
//
//import java.io.IOException;
//
//public class FilterConnect implements Filter {
//    private FilterConfig config = null;
//
//    @Override
//    public void init(FilterConfig filterConfig) throws ServletException {
//        this.config = config;
//    }
//
//    @Override
//    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
//        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
//        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;
//        if (httpRequest.getHeader("Authorization") != null && httpRequest.getHeader("Authorization").equals("Begrer 1234"))
//            filterChain.doFilter(servletRequest, servletResponse);
//        try {
//            httpResponse.sendError(401, "Wrong authorization code((");
//        } catch (Exception e) {
//            return;
//        }
//
//
//
//    }
//
//    @Override
//    public void destroy() {
//        config = null;
//    }
//}
