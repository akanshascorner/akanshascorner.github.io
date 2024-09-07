
import java.util.*;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class slidingPuzzle extends JFrame implements KeyListener
{
    private JButton [][] buttons;
    private String [][] values = new String [4][4];
    private Container win = getContentPane();
    private static boolean GO = false;
    
    public slidingPuzzle()
    {
        super("4x4 Sliding Puzzle");
        JPanel center = new JPanel();
        win.setLayout(new BorderLayout());
        
        JTextArea instructions = new JTextArea("\n        Use the arrow keys to move a button into the empty space.\n        Solve the puzzle so that the numbers are in numerical order\n        from 1-15.\n        Click on the grid to begin!\n");
        instructions.setFont(new Font("Calibri", Font.BOLD, 20));
        instructions.setBackground(Color.WHITE);
        instructions.setForeground(new Color(70, 99, 172));
                
        win.add(center, BorderLayout.CENTER);
        win.add(instructions, BorderLayout.NORTH);
        center.setLayout(new GridLayout(4,4));
        
        buttons = new JButton[4][4];
        
        Random randy = new Random();
        int [] nums = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15};
        int xRand = 0;
        int yRand = 0;
        do
        {
            values = new String[4][4];
            for (int i = 0; i < nums.length; i++) 
            {            
                do 
                {
                    xRand = randy.nextInt(4);
                    yRand = randy.nextInt(4);
                    if (values[xRand][yRand] == null) 
                    {
                        values[xRand][yRand] = ""+nums[i];
                        break;
                    }
                } while (!values[xRand][yRand].equals(""+nums[i]));
            }
        }while(!isSolvable(values));
        
        Font f = new Font("Ariel", Font.BOLD, 28);
        
        for(int x = 0; x<4; x++)
        {
            for(int y = 0; y<4; y++)
            {
                buttons[x][y] = new JButton(values[x][y]);
                center.add(buttons[x][y]);
                buttons[x][y].setBackground(new Color(70, 99, 172));
                if (values[x][y] == null)
                   buttons[x][y].setBackground(Color.WHITE);
                buttons[x][y].setForeground(Color.WHITE);
                buttons[x][y].setFont(f);
                buttons[x][y].addKeyListener(this);
            }
        }
        
        setSize(600,650);
        setVisible(true);
    }
    public void keyPressed(KeyEvent e)
    {
         int c = e.getKeyCode( );
         int a = 0, b = 0;
         for(int x = 0; x < 4; x++)
         {
             for(int y = 0; y< 4; y++)
             {
                 if(values[x][y] == null)
                 {
                     a = x;
                     b = y;
                 }
             }
         }
         if (!GO)
         {
             switch(c)
             {
                 case 38: if(a != 3)
                         {
                            buttons[a][b].setText(values[a+1][b]);
                            buttons[a][b].setBackground(new Color(70, 99, 172));
                            buttons[a+1][b].setText("");
                            buttons[a+1][b].setBackground(Color.WHITE);
                            values[a][b] = values[a+1][b];
                            values[a+1][b] = null;
                         }
                         else
                            JOptionPane.showMessageDialog(null, "There is nothing below the blank space", "Move Error", JOptionPane.WARNING_MESSAGE);
                            break;
                 case 37: if(b != 3)
                          {
                              buttons[a][b].setText(values[a][b+1]);
                              buttons[a][b].setBackground(new Color(70, 99, 172));
                              buttons[a][b+1].setText("");
                              buttons[a][b+1].setBackground(Color.WHITE);
                              values[a][b] = values[a][b+1];
                              values[a][b+1] = null;
                          }
                          else
                            JOptionPane.showMessageDialog(null, "There is nothing to the left of the blank space", "Move Error", JOptionPane.WARNING_MESSAGE);
                            break;
                 case 39: if(b != 0)
                          {
                              buttons[a][b].setText(values[a][b-1]);
                              buttons[a][b].setBackground(new Color(70, 99, 172));
                              buttons[a][b-1].setText("");
                              buttons[a][b-1].setBackground(Color.WHITE);
                              values[a][b] = values[a][b-1];
                              values[a][b-1] = null;
                          }
                          else
                            JOptionPane.showMessageDialog(null, "There is nothing to the right of the blank space", "Move Error", JOptionPane.WARNING_MESSAGE);
                            break;
                 case 40: if(a != 0)
                          {
                              buttons[a][b].setText(values[a-1][b]);
                              buttons[a][b].setBackground(new Color(70, 99, 172));
                              buttons[a-1][b].setText("");
                              buttons[a-1][b].setBackground(Color.WHITE);
                              values[a][b] = values[a-1][b];
                              values[a-1][b] = null;
                          }
                          else
                            JOptionPane.showMessageDialog(null, "There is nothing above the blank space", "Move Error", JOptionPane.WARNING_MESSAGE);
                            break;   
             }
         }
         GO = gameOver(win,values);
            
    }
    public void keyTyped(KeyEvent e )
    {
    }
    public void keyReleased(KeyEvent e)
    {
    }

    public static int getBlankXPos(String[][] board) 
    {
        for(int i = 0; i < board.length; i++) 
        {
            for (int j = board.length-1; j >= 0; j--) 
            {
                if (board[i][j] == null)
                    return board.length-i;
            }
        }
        return -1;
    }
    public static int getInversions(String[][] board) 
    {
        int [] nums = new int[board.length*board.length];
        int invCount = 0;
        for (int i = 0; i < board.length; i++) 
        {
            for (int j = 0; j < board.length; j++) 
            {
                if (board[i][j] == null)
                    nums[i*board.length+j] = 0;
                else
                    nums[i*board.length+j] = Integer.parseInt(board[i][j]);
            }
        }
        for (int i = 0; i < nums.length-1; i++) 
        {
            for (int j = i; j < nums.length; j++) 
            {
                if (nums[j] != 0 && nums[i] != 0 && nums[i] > nums[j])
                    invCount++;
            }
        }
        return invCount;
    }
    public static boolean isSolvable(String[][] board) 
    {
        int invCount = getInversions(board);
        if (board.length % 2 == 1) 
            return invCount % 2 == 0;
        else {
            int pos = getBlankXPos(board);
            if (pos % 2 == 1)
                return invCount % 2 == 0;
            else
                return invCount % 2 == 1;
        }
    }

    
    public static boolean gameOver(Container window, String[][] board) 
    {
        int [] nums = new int[board.length*board.length];
        for (int a = 0; a < board.length; a++)
        {
            for (int b = 0; b < board.length; b++) 
            {
                if (board[a][b] == null)
                    nums[a*board.length+b] = 0;
                
                else
                    nums[a*board.length+b] = Integer.parseInt(board[a][b]);
            }
        }

        int notBlank = board.length * board.length - 1;
        if (nums[nums.length-1] != 0)
        {
            return false;
        }
        for (int i = notBlank-1; i >= 0; i--)
        {
            if (nums[i] != i + 1)
            {
                return false;  
            }
        }
        JOptionPane.showMessageDialog(null, "You've solved the puzzle!", "Congratulations!", JOptionPane.PLAIN_MESSAGE);
        return true;
    }

    
    public static void main (String [] args)
    {
        slidingPuzzle app = new slidingPuzzle();
    }
}





