package servlets;

import sessions.ReqHttpList;
import sessions.ReqFormat;

import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        boolean isCorrect = true;
        double x = 0;
        int y = 0;
        boolean answer = false;
        double r = 0;
        try {
            x = Double.parseDouble(req.getParameter("x"));
            y = Integer.parseInt(req.getParameter("y"));
            r = Double.parseDouble(req.getParameter("r"));
            if (x >= 0 && y >= 0) {
                if (x * x + y * y <= r * r)
                    answer = true;
            }
            if (x >= 0 && y <= 0) {
                if (x - y <= r)
                    answer = true;
            }
            if (x <= 0 && y <= 0) {
                if (x <= r && y <= r)
                    answer = true;
            }
            if ((x < -5 || x > 5 || r < 1 || r > 4) && (y == -4 || y == -3 || y == -2 || y == -1 ||
                    y == 0 || y == 1 || y == 2 || y == 3 || y == 4)) {
                isCorrect = false;
            }
        } catch (Exception e) {
            isCorrect = false;
        }

        ReqFormat requestHttp = new ReqFormat();
        requestHttp.setIsIn(answer);
        requestHttp.setCorrect(isCorrect);
        if (isCorrect) {
            requestHttp.setX(x);
            requestHttp.setY(y);
            requestHttp.setR(r);
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM-dd-yyyy HH:mm:ss");
        requestHttp.setDate(simpleDateFormat.format(new Date()));
        requestHttp.setTime(System.currentTimeMillis() - (Long) req.getAttribute("startTime"));

        ReqHttpList reqList;
        try {
            reqList = ((ReqHttpList) req.getSession().getAttribute("reqList"));
        } catch (Exception e) {
            reqList = new ReqHttpList();
        }
        reqList.addToList(requestHttp);
        HttpSession session=req.getSession();
        session.setAttribute("reqList", reqList);
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        out.print((new Gson()).toJson(requestHttp));
        out.flush();
    }
}
