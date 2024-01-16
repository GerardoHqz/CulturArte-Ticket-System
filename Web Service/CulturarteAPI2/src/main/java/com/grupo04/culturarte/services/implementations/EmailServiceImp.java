package com.grupo04.culturarte.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.grupo04.culturarte.models.dtos.EmailDetails;
import com.grupo04.culturarte.services.EmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImp implements EmailService {

	@Autowired
	private JavaMailSender mailSender;

	@Value("${spring.mail.username}")
	private String sender;

	@Override
	public void sendEmail(EmailDetails details) throws MessagingException {
	    MimeMessage message = mailSender.createMimeMessage();
	    MimeMessageHelper helper = new MimeMessageHelper(message, true);

	    // Setting up necessary details
	    helper.setFrom(sender);
	    helper.setTo(details.getRecipient());
	    helper.setSubject(details.getSubject());

	    // Creating the HTML content
	    String htmlContent = "<html>"
	            + "<head>"
	            + "<style>"
	            + "/* CSS styles for the banner */"
	            + ".banner {"
	            + "  background-color: #f2f2f2;"
	            + "  padding: 10px;"
	            + "  text-align: center;"
	            + "}"
	            + "/* CSS styles for the email body */"
	            + ".email-body {"
	            + "  font-family: Arial, sans-serif;"
	            + "  font-size: 14px;"
	            + "  line-height: 1.5;"
	            + "  color: #333333;"
	            + "}"
	            + "</style>"
	            + "</head>"
	            + "<body>"
	            + "<div class=\"banner\">"
	            + "  <img src=\"https://postimg.cc/5HnxrL7w\" alt=\"Banner\" />"
	            + "</div>"
	            + "<div class=\"email-body\">"
	            + details.getMsgBody()
	            + "</div>"
	            + "</body>"
	            + "</html>";

	    // Setting the HTML content as the email body
	    helper.setText(htmlContent, true);

	    // Sending the mail
	    mailSender.send(message);
	}

}