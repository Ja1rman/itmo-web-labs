package pagination;

import com.google.gson.Gson;
import db.HibernateSessionFactoryUtil;
import newBeans.BeanData;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.primefaces.context.RequestContext;
import org.primefaces.model.LazyDataModel;
import org.primefaces.model.SortMeta;
import org.primefaces.model.SortOrder;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class PaginationList extends LazyDataModel<BeanData> {
    private static final long serialVersionUID = 652968509827757690L;
    private String username;
    public PaginationList(String username){
        this.username = username;
        Session session = HibernateSessionFactoryUtil.getSessionFactory().openSession();
        boolean withUser = username != null && !username.equals("");
        String queryString = withUser ? "select count(*) from req where username = :uname" : "select count(*) from req";
        Query<Long> query = session.createQuery(queryString, Long.class);
        if (withUser)
            query.setParameter("uname", username);
        Long count = query.uniqueResult();
        setRowCount(count.intValue());
        session.close();
    }
    public void incRowCount(){
        setRowCount(getRowCount()+1);
    }


    @Override
    public List<BeanData> load(int first, int pageSize, String sortField, SortOrder sortOrder, Map<String, Object> filters) {

        List<BeanData> beans;
        try {
            Session session = HibernateSessionFactoryUtil.getSessionFactory().openSession();
            boolean withUser = username != null && !username.equals("");
            String queryString = withUser ? "from req where username = :uname order by id DESC" : "from req order by id DESC";
            Query<BeanData> query = session.createQuery(queryString, BeanData.class);

            if (withUser)
                query.setParameter("uname", username);
            query.setFirstResult(first);
            query.setMaxResults(pageSize);
            beans = query.list();

            session.close();
        }
        catch (Exception e){
            e.printStackTrace();
            beans = new ArrayList<BeanData>();
        }
        RequestContext.getCurrentInstance().execute("window.getRequestsAndDraw('" + new Gson().toJson(beans) + "')");
        return beans;
    }
}
