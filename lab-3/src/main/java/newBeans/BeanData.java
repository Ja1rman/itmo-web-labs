package newBeans;

import javax.persistence.*;
import java.io.Serializable;
@Entity(name = "req")
@Table(name = "requests")
public class BeanData implements Serializable {
    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    @Column(name = "username")
    private String username;
    public void setId(int id) {
        this.id = id;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    private static final long serialVersionUID = 6529685098267757690L;
    @Column(name = "isin")
    private boolean isin;

    public BeanData(){}
    public BeanData(String username){
        this.username = username;
    }

    public boolean getIsin() {
        return isin;
    }

    public void setIsin(boolean isin) {
        this.isin = isin;
    }


    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR() {
        boolean rr2 = getR2();
        boolean rr3 = getR3();
        boolean rr4 = getR4();
        boolean rr5 = getR5();
        double rr = 1;
        if (rr2) rr = 2;
        if (rr3) rr = 3;
        if (rr4) rr = 4;
        if (rr5) rr = 5;
        this.r = rr;
    }
    public void setR1(boolean r1) {
        if (r1) this.r = 1;
        this.r1 = r1;
    }
    public void setR2(boolean r2) {
        if (r2) this.r = 2;
        this.r2 = r2;
    }
    public void setR3(boolean r3) {
        if (r3) this.r = 3;
        this.r3 = r3;
    }
    public void setR4(boolean r4) {
        if (r4) this.r = 4;
        this.r4 = r4;
    }
    public void setR5(boolean r5) {
        if (r5) this.r = 5;
        this.r5 = r5;
    }
    public boolean getR1() {
        return this.r1;
    }
    public boolean getR2() {
        return this.r2;
    }
    public boolean getR3() {
        return this.r3;
    }
    public boolean getR4() {
        return this.r4;
    }
    public boolean getR5() {
        return this.r5;
    }
    public double getR() {
        return r;
    }
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }
    @Column(name = "x")
    private double x;
    @Column(name = "y")
    private double y;
    @Column(name = "r")
    private double r;
    @Transient
    private boolean r1;
    @Transient
    private boolean r2;
    @Transient
    private boolean r3;
    @Transient
    private boolean r4;
    @Transient
    private boolean r5;
    @Column(name = "datereq")
    private String date;
    @Column(name = "timereq")
    private long time;


    @Override
    public String toString() {
        return "BeanData{" +
                "username='" + username + '\'' +
                ", id=" + id +
                ", isin=" + isin +
                ", x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", date='" + date + '\'' +
                '}';
    }


}