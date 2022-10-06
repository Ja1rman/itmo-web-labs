package servlets;
import sessions.ReqHttpList;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getParameter("cookie") == null && (req.getParameter("x") == null ||
                req.getParameter("y") == null || req.getParameter("r") == null)){
            if (req.getSession().getAttribute("reqList") == null)
                req.getSession().setAttribute("reqList", new ReqHttpList());
            RequestDispatcher requestDispatcher = getServletContext().getRequestDispatcher("/index.jsp");
            requestDispatcher.forward(req, resp);

        } else{
            if (req.getParameter("x") != null && req.getParameter("y") != null && req.getParameter("r") != null) {
                req.setAttribute("startTime", System.currentTimeMillis());
                RequestDispatcher requestDispatcher = getServletContext().getRequestDispatcher("/AreaCheckServlet");
                requestDispatcher.forward(req, resp);

            } else {
                RequestDispatcher requestDispatcher = getServletContext().getRequestDispatcher("/RecoverServlet");
                requestDispatcher.forward(req, resp);
            }
        }
    }
}
