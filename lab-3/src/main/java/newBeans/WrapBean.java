package newBeans;
import com.google.gson.Gson;
import db.HibernateSessionFactoryUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.primefaces.context.RequestContext;
import pagination.PaginationList;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

//@ManagedBean(name = "wrapBean", eager = true)
//@SessionScoped
public class WrapBean implements Serializable {
    public WrapBean(){
        paginationList = new PaginationList("");
    }
    private static final long serialVersionUID = 6529685098267757690L;
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    private String username;

    public PaginationList getPaginationList() {
        return paginationList;
    }

    public void setPaginationList(PaginationList paginationList) {
        this.paginationList = paginationList;
    }

    private PaginationList paginationList;


    public String start(){
        paginationList = new PaginationList(username);
        return "startLab";
    }

    public BeanData getBeanData() {
        return beanData;
    }

    public void setBeanData(BeanData beanData) {
        this.beanData = beanData;
    }

    private BeanData beanData = new BeanData();

    public void newRequest() {
        double x = beanData.getX();
        double y = beanData.getY();
        double r = beanData.getR();
        beanData.setUsername(username);
        boolean answer = false;
        try {
            if (x <= 0 && y >= 0) {
                if (x * x + y * y <= r * r)
                    answer = true;
            }
            if (x >= 0 && y >= 0) {
                if (x <= r / 2 && y <= r)
                    answer = true;
            }
            if (x <= 0 && y <= 0) {
                if (y +2*x >= - r)
                    answer = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        beanData.setIsin(answer);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM-dd-yyyy HH:mm:ss");
        beanData.setDate(simpleDateFormat.format(new Date()));
        Session session = HibernateSessionFactoryUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();
        session.save(beanData);
        transaction.commit();
        session.close();
        beanData = new BeanData(username);
        paginationList.incRowCount();

    }


}
