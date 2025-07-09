from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QLabel, QFileDialog, QPushButton, QWidget, \
    QMessageBox, QDialog, QTextEdit
from PyQt5.QtGui import QPixmap
import sys

from converters.input_converter import *
from converters.change_variant_converter import *


class FileConverterWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        self.file_paths = []

        self.setWindowTitle("Migration Files Converter")
        self.setGeometry(200, 200, 600, 600)

        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)

        self.layout = QVBoxLayout()
        self.central_widget.setLayout(self.layout)

        self.image_label = QLabel(self)
        self.image_label.setAlignment(Qt.AlignCenter)  # Set alignment to center

        # Set the fixed size for the picture
        image_width = 600
        image_height = 400
        self.image_label.setFixedSize(image_width, image_height)
        pixmap = QPixmap("pics/meshi_and_lazi.jpg")  # Set the path to your image file
        scaled_pixmap = pixmap.scaled(image_width, image_height, Qt.AspectRatioMode.KeepAspectRatio)
        self.image_label.setPixmap(scaled_pixmap)
        self.layout.addWidget(self.image_label)

        self.button_remove_columns = QPushButton("Remove Pre-migration Files Columns", self)
        self.button_remove_columns.clicked.connect(self.show_remove_columns_interface)
        self.layout.addWidget(self.button_remove_columns)

        self.button_change_variant_ids = QPushButton("Change Migration File Variant IDs", self)
        self.button_change_variant_ids.clicked.connect(self.show_change_variant_ids_interface)
        self.layout.addWidget(self.button_change_variant_ids)

        self.back_button = QPushButton("Back", self)
        self.back_button.clicked.connect(self.show_initial_interface)
        self.back_button.setVisible(False)  # Initially hidden
        self.layout.addWidget(self.back_button)

        self.file_names_label = QLabel(self)
        self.layout.addWidget(self.file_names_label)

        self.select_button = QPushButton("Select Files", self)
        self.select_button.clicked.connect(self.select_files)
        self.select_button.setVisible(False)  # Initially hidden
        self.layout.addWidget(self.select_button)

        self.convert_button = QPushButton("Convert", self)
        self.convert_button.clicked.connect(self.convert_files)
        self.convert_button.setVisible(False)  # Initially hidden
        self.convert_button.setEnabled(False)
        self.layout.addWidget(self.convert_button)

        self.variant_ids_text_edit = QTextEdit(self)
        self.variant_ids_text_edit.setPlaceholderText(
            "Enter variant IDs map (format - old_variant_id:new_variant_id,old_variant_id2:new_variant_id2)")
        self.layout.addWidget(self.variant_ids_text_edit)
        self.variant_ids_text_edit.setVisible(False)

    def show_remove_columns_interface(self):
        self.button_remove_columns.setVisible(False)
        self.button_change_variant_ids.setVisible(False)
        self.back_button.setVisible(True)
        self.select_button.setVisible(True)
        self.convert_button.setVisible(True)

    def show_change_variant_ids_interface(self):
        self.button_remove_columns.setVisible(False)
        self.button_change_variant_ids.setVisible(False)
        self.back_button.setVisible(True)
        self.select_button.setVisible(True)
        self.convert_button.setVisible(True)
        self.variant_ids_text_edit.setVisible(True)

    def show_initial_interface(self):
        self.button_remove_columns.setVisible(True)
        self.button_change_variant_ids.setVisible(True)
        self.back_button.setVisible(False)
        self.select_button.setVisible(False)
        self.convert_button.setVisible(False)
        self.variant_ids_text_edit.setVisible(False)

    def select_files(self):
        options = QFileDialog.Options()
        options |= QFileDialog.ExistingFiles
        dialog = QFileDialog(self, "Select Files", "", "CSV Files (*.csv);;All Files (*)")
        dialog.setFileMode(QFileDialog.ExistingFiles)
        dialog.setViewMode(QFileDialog.Detail)

        if dialog.exec_() == QDialog.Accepted:
            file_paths = dialog.selectedFiles()

            if len(file_paths) > 10:
                QMessageBox.warning(self, "File Limit Exceeded", "Please select up to 10 CSV files.")
                return

            self.file_paths = file_paths
            self.update_file_names_label()
            self.convert_button.setEnabled(True)

    def update_file_names_label(self):
        if self.file_paths:
            file_names = "\n".join([os.path.basename(file_path) for file_path in self.file_paths])
            self.file_names_label.setText(file_names)
        else:
            self.file_names_label.setText("No files selected")

    def get_variant_ids_map_from_text_edit(self):
        variant_ids_input = self.variant_ids_text_edit.toPlainText()

        variant_ids_map = {}
        variant_ids = variant_ids_input.split(',')
        for variant_id_pair in variant_ids:
            ids = variant_id_pair.split(':')
            if len(ids) == 2:
                variant_ids_map[ids[0].strip()] = ids[1].strip()

        if len(variant_ids_map) == 0:
            return None

        return variant_ids_map

    def convert_files(self):
        converted_files = []
        for file_path in self.file_paths:
            file_dir, file_name = os.path.split(file_path)
            output_file_name = f"converted_{file_name}"

            try:
                if "subscription" in file_name:
                    subscription_convertor(file_path, output_file_name)
                elif "charges_processed" in file_name:
                    processed_charge_convertor(file_path, output_file_name)
                elif "charges_queued" in file_name:
                    queued_charge_convertor(file_path, output_file_name)
                elif "addresses" in file_name:
                    addresses_convertor(file_path, output_file_name)
                elif "customers" in file_name:
                    customers_convertor(file_path, output_file_name)
                elif "authorize_transactions" in file_name:
                    authorize_transactions_convertor(file_path, output_file_name)
                elif "migration" in file_name:
                    variant_ids_map = self.get_variant_ids_map_from_text_edit()
                    if not variant_ids_map:
                        QMessageBox.warning(self, "Missing Variant IDs", "Please enter variant IDs to convert.")
                        return
                    change_variants(file_path, output_file_name, variant_ids_map)
                else:
                    raise ValueError(f"Invalid file name: {file_name}")

                converted_files.append(output_file_name)
            except Exception as e:
                QMessageBox.critical(self, "Conversion Error", f"Error converting file '{file_name}': {str(e)}")
                return

        QMessageBox.information(self, "Conversion Complete",
                                f"Files converted successfully: {', '.join(converted_files)}")
        self.file_paths = []
        self.update_file_names_label()
        self.convert_button.setEnabled(False)

        if self.button_remove_columns.isVisible():
            self.show_remove_columns_interface()
        elif self.button_change_variant_ids.isVisible():
            self.show_change_variant_ids_interface()
        else:
            self.show_initial_interface()


def run_converter():
    app = QApplication(sys.argv)
    window = FileConverterWindow()
    window.show()
    sys.exit(app.exec_())


if __name__ == '__main__':
    run_converter()
