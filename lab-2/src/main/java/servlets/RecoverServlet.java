package servlets;

import sessions.ReqHttpList;
import sessions.ReqFormat;

import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class RecoverServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session=req.getSession();
        ArrayList<ReqFormat> list = new ArrayList<>();
        try{
            list = ((ReqHttpList)session.getAttribute("reqList")).getList();
        }
        catch (Exception e){
            session.setAttribute("reqList", new ReqHttpList());
        }
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        out.print((new Gson()).toJson(list));
        out.flush();
    }
}
