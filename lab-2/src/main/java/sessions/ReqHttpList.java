package sessions;

import java.io.Serializable;
import java.util.ArrayList;

public class ReqHttpList implements Serializable {
    public ReqHttpList(){

    }
    public ArrayList<ReqFormat> getList() {
        return list;
    }

    public void setList(ArrayList<ReqFormat> list) {
        this.list = list;
    }
    public void addToList(ReqFormat requestXYRBean){
        list.add(requestXYRBean);

    }

    private ArrayList<ReqFormat> list = new ArrayList<>();
}
