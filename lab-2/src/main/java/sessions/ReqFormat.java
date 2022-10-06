package sessions;

import java.io.Serializable;

public class ReqFormat implements Serializable {
    public ReqFormat(){

    }
    private boolean isCorrect;
    private boolean isIn;
    private double x;
    private double y;
    private double r;
    private String date;
    private long time;


    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }

    public boolean getIsIn() {
        return isIn;
    }

    public void setIsIn(boolean in) {
        isIn = in;
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

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }
}
