"""
Test Logger for RavenCode Frontend Test Suite
Handles logging and PDF report generation
"""

import os
import time
from datetime import datetime
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
try:
    from config import REPORTS_DIR
except ImportError:
    import os
    REPORTS_DIR = os.path.join(os.path.dirname(__file__), 'reports')
    os.makedirs(REPORTS_DIR, exist_ok=True)


class TestLogger:
    def __init__(self, test_suite_name="RavenCode Frontend Tests"):
        self.test_suite_name = test_suite_name
        self.logs = []
        self.start_time = None
        self.end_time = None
        self.test_results = {
            'PASS': 0,
            'FAIL': 0,
            'INFO': 0,
            'WARN': 0
        }
        
    def start_test(self):
        """Start the test session"""
        self.start_time = datetime.now()
        self.add_log(f"Starting {self.test_suite_name}", "INFO")
        
    def end_test(self):
        """End the test session"""
        self.end_time = datetime.now()
        if self.start_time:
            duration = self.end_time - self.start_time
            self.add_log(f"Test session completed in {duration}", "INFO")
        else:
            self.add_log("Test session completed", "INFO")
        
    def add_log(self, message, log_type="INFO"):
        """Add a log entry"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = {
            'timestamp': timestamp,
            'message': message,
            'type': log_type
        }
        self.logs.append(log_entry)
        self.test_results[log_type] = self.test_results.get(log_type, 0) + 1
        
        # Print to console with color coding
        color_codes = {
            'PASS': '\033[92m',  # Green
            'FAIL': '\033[91m',  # Red
            'WARN': '\033[93m',  # Yellow
            'INFO': '\033[94m'   # Blue
        }
        reset_code = '\033[0m'
        
        color = color_codes.get(log_type, '')
        print(f"{color}[{timestamp}] {log_type}: {message}{reset_code}")
        
    def generate_pdf(self):
        """Generate PDF report"""
        if not self.start_time:
            self.add_log("Cannot generate report: Test session not started", "FAIL")
            return None
            
        # Create unique filename
        timestamp = int(time.time())
        filename = f"ravencode_frontend_test_report_{timestamp:010d}.pdf"
        filepath = os.path.join(REPORTS_DIR, filename)
        
        # Create PDF document
        doc = SimpleDocTemplate(
            filepath,
            pagesize=A4,
            rightMargin=72,
            leftMargin=72,
            topMargin=72,
            bottomMargin=18
        )
        
        # Styles
        styles = getSampleStyleSheet()
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            spaceAfter=30,
            alignment=TA_CENTER,
            textColor=colors.darkblue
        )
        
        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=styles['Heading2'],
            fontSize=16,
            spaceAfter=12,
            spaceBefore=12,
            textColor=colors.darkblue
        )
        
        # Story elements
        story = []
        
        # Title
        story.append(Paragraph("RavenCode Frontend Test Report", title_style))
        story.append(Spacer(1, 12))
        
        # Test Summary
        story.append(Paragraph("Test Summary", heading_style))
        
        summary_data = [
            ['Test Suite', self.test_suite_name],
            ['Start Time', self.start_time.strftime("%Y-%m-%d %H:%M:%S")],
            ['End Time', self.end_time.strftime("%Y-%m-%d %H:%M:%S") if self.end_time else "In Progress"],
            ['Duration', str(self.end_time - self.start_time) if self.end_time else "N/A"],
            ['Total Tests', str(self.test_results['PASS'] + self.test_results['FAIL'])],
            ['Passed', str(self.test_results['PASS'])],
            ['Failed', str(self.test_results['FAIL'])],
            ['Warnings', str(self.test_results['WARN'])],
            ['Info Messages', str(self.test_results['INFO'])]
        ]
        
        summary_table = Table(summary_data, colWidths=[2*inch, 3*inch])
        summary_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 12),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        
        story.append(summary_table)
        story.append(Spacer(1, 12))
        
        # Test Results Overview
        if self.test_results['PASS'] + self.test_results['FAIL'] > 0:
            pass_rate = (self.test_results['PASS'] / (self.test_results['PASS'] + self.test_results['FAIL'])) * 100
            story.append(Paragraph(f"Pass Rate: {pass_rate:.1f}%", heading_style))
            story.append(Spacer(1, 12))
        
        # Detailed Logs
        story.append(Paragraph("Detailed Test Logs", heading_style))
        
        # Group logs by type for better organization
        log_types = ['FAIL', 'PASS', 'WARN', 'INFO']
        
        for log_type in log_types:
            type_logs = [log for log in self.logs if log['type'] == log_type]
            if not type_logs:
                continue
                
            story.append(Paragraph(f"{log_type} Messages ({len(type_logs)})", 
                                 ParagraphStyle('SubHeading', parent=styles['Heading3'], 
                                              fontSize=14, textColor=colors.darkred if log_type == 'FAIL' 
                                              else colors.darkgreen if log_type == 'PASS'
                                              else colors.darkorange if log_type == 'WARN'
                                              else colors.darkblue)))
            
            for log in type_logs:
                log_text = f"[{log['timestamp']}] {log['message']}"
                story.append(Paragraph(log_text, styles['Normal']))
                story.append(Spacer(1, 6))
            
            story.append(Spacer(1, 12))
        
        # Build PDF
        try:
            doc.build(story)
            self.add_log(f"PDF report generated: {filename}", "INFO")
            return timestamp
        except Exception as e:
            self.add_log(f"Failed to generate PDF report: {str(e)}", "FAIL")
            return None
            
    def get_summary(self):
        """Get test summary"""
        total_tests = self.test_results['PASS'] + self.test_results['FAIL']
        pass_rate = (self.test_results['PASS'] / total_tests * 100) if total_tests > 0 else 0
        
        return {
            'total_tests': total_tests,
            'passed': self.test_results['PASS'],
            'failed': self.test_results['FAIL'],
            'pass_rate': pass_rate,
            'duration': str(self.end_time - self.start_time) if self.end_time and self.start_time else "N/A"
        } 